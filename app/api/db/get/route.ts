import { Query } from 'mysql';
import mysql, { Connection, RowDataPacket } from 'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server'
import createDBConnection from '../db-connection';

export async function POST(request: NextRequest) {

  const db: Connection = await createDBConnection();

  const headers = request.headers;

  const query = `SELECT * FROM ${headers.get('table')} WHERE p_key = ${headers.get('p_key')}`;

  console.log(query);

  let value = null;

  try {
    const result = await db.query(query) as RowDataPacket[];
    value = JSON.stringify(result[0][0]);
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
      data: value as string,
      status: '200'
    },
  })
}