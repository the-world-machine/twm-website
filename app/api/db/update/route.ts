import { Query } from 'mysql';
import mysql, { Connection, RowDataPacket } from 'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server'
import createDBConnection from '../db-connection';

export async function POST(request: NextRequest) {

  if (request.headers.get('key') !== process.env.NEXT_PUBLIC_DB_KEY) {
    return new Response(`Unauthorized.`, {
      status: 401
    })
  }

  const db: Connection = await createDBConnection();

  const headers = request.headers;

  const query = `UPDATE ${headers.get('table')} SET ${headers.get('column')} = ? WHERE p_key = ${headers.get('p_key')}`;

  let value = null;

  try {
    await db.execute(query, [headers.get('data')]); 
  } catch (error) {

    console.error(error);

    await db.end();

    return new Response(`Unable to connect.`, {
      status: 503,
    })
  }

  await db.end();

  return new Response(`Successfully updated database.`, {
    status: 200,
  })
}