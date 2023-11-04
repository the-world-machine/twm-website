import { Query } from 'mysql';
import mysql, { Connection, RowDataPacket } from 'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server'
import createDBConnection from '../db-connection';

export async function POST(request: NextRequest) {

  const db: Connection = await createDBConnection();

  const headers = request.headers;

  console.log(headers);

  const query = `UPDATE ${headers.get('table')} SET ${headers.get('column')} = '${headers.get('data')}' WHERE p_key = ${headers.get('p_key')}`;

  console.log(query);

  let value = null;

  try {
    const result = await db.execute(query);
  } catch (error) {
    return new Response(`200`, {
      status: 200,
      headers: {
        status: 'error'
      }
    })
  }

  return new Response(`200`, {
    status: 200,
    headers: {
      status: '200'
    },
  })
}