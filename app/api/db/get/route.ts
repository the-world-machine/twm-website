import { Query } from 'mysql';
import mysql, { Connection, RowDataPacket } from 'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server'
import createDBConnection from '../db-connection';

export async function POST(request: NextRequest) {

  if (request.headers.get('key') !== process.env.NEXT_PUBLIC_DB_KEY) {

    console.error('Incorrect Access Key.')
    
    return new Response(`Unauthorized.`, {
      status: 401
    })
  }

  const db: Connection = await createDBConnection();

  const headers = request.headers;

  const gettingAllData = headers.get('p_key') === 'all';

  let query = '';

  if (gettingAllData) {
    query = `SELECT * FROM ${headers.get('table')}`
  } else {
    query = `SELECT * FROM ${headers.get('table')} WHERE p_key = ${headers.get('p_key')}`
  }

  console.log(query)
  
  let value = null;

  try {
    const result = await db.query(query) as RowDataPacket[];

    if (gettingAllData) {
      value = JSON.stringify(result[0]);
    }
    else {
      value = JSON.stringify(result[0][0]);
    }
    
  } catch (error) {

    console.log(error)

    await db.end();

    return new Response(`Error.`, {
      status: 503,
    })
  }

  await db.end();

  return new Response(`Successful.`, {
    status: 200,
    headers: {
      data: value as string,
    },
  })
}