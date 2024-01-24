'use server'
import mysql, { RowDataPacket } from 'mysql2/promise';
import axios from 'axios';
import { LeaderboardUser } from './leaderboards/page';

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

    let result: any = [];

    try {
        result = await db.query(query, [primary_key]);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        db.release();
    }

    if (result != null && result[0].length > 0) {
        return result[0];
    } else {
        const discordData = await GetDiscordData(primary_key);
        query = `INSERT INTO ${table} (p_key, username) VALUES (?, ?)`; 
        result = await db.execute(query, [primary_key, discordData.global_name]);
        return await Fetch(table, primary_key);
    }
}

export async function Update(table: string, column: string, primary_key: string, data: any) {

    const db = await connection.getConnection();

    const discordData = await GetDiscordData(data.id);
    
    const sql = `UPDATE ${table} SET ${column} = ? WHERE p_key = ${primary_key}`;

    try {
        await db.execute(sql, [data]);
        return 'success';
    } catch (error) {
        console.error('Error updating data:', error);
        return 'error';
    }
}

export async function GetLeaderboard(): Promise<any> {

    const db = await connection.getConnection();
    
    const sql = `SELECT username, wool, suns, times_transmitted, times_asked, times_shattered FROM UserData`;

    try {
        const result = await db.query(sql);
        const userList: any = result[0];

        return userList;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        return null;
    }
}

export async function GetDiscordData(userID: string) {
    const response = await axios.get(`https://discordlookup.mesavirep.xyz/v1/user/${userID}`)

    return response.data;
}

export async function GetBackgrounds() {
    const end_point = 'https://api.npoint.io/6940a9826da1e0473197/backgrounds';

    const responseBackgrounds = await fetch(end_point);
    return await responseBackgrounds.json();
}