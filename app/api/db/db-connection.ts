import mysql, { Connection } from 'mysql2/promise';
import Config from '../../../twm-config.json'

export default async function createDBConnection(): Promise<Connection> {
    const connection = await mysql.createConnection({
      host: Config.DB_HOST,
      user: Config.DB_USERNAME,
      password: Config.DB_PASSWORD,
      database: Config.DB_NAME,
    });
    return connection;
}
  