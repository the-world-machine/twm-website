import mysql, { Connection } from 'mysql2/promise';

export default async function createDBConnection(): Promise<Connection> {
    const connection = await mysql.createConnection({
      host: process.env.NEXT_PUBLIC_DB_HOST,
      user: process.env.NEXT_PUBLIC_DB_USERNAME,
      password: process.env.NEXT_PUBLIC_DB_PASSWORD,
      database: process.env.NEXT_PUBLIC_DB_NAME ,
    });
    return connection;
}
  