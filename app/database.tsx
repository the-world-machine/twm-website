'use server'
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: process.env.NEXT_PUBLIC_DB_HOST,
    user: process.env.NEXT_PUBLIC_DB_USERNAME,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    database: process.env.NEXT_PUBLIC_DB_NAME,
});

export async function Fetch(table: string, primary_key: any): Promise<any> {

    const db = await connection.getConnection();
    
    const allData: boolean = primary_key === 'all';

    let query = '';
    if (allData) {
        query = `SELECT * FROM ${table}`;
    } else {
        query = `SELECT * FROM ${table} WHERE p_key = ?`;
    }

    let result = null;

    try {
        result = await db.query(query, [primary_key]);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        db.end();
    }

    if (result !== null) {
        return result[0];
    } else {
        return null;
    }
}

export async function Update(table: string, column: string, primary_key: string, data: any) {

    const db = await connection.getConnection();
    
    const sql = `UPDATE ${table} SET ${column} = ? WHERE p_key = ${primary_key}`;

    try {
        await db.execute(sql, [data]);
        return 'success';
    } catch (error) {
        console.error('Error updating data:', error);
        return 'error';
    }
}