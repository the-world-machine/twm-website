'use server'
import axios from 'axios';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { UserData } from './components/database-parse-type'

let collection: null | Collection<UserData> = null

async function connectToDatabase() {

    if (collection != null) { return collection }

    const uri = process.env.NEXT_PUBLIC_DB_URI as string

    const mongoDBClient: MongoClient = new MongoClient(uri)

    await mongoDBClient.connect()

    const db = mongoDBClient.db('TheWorldMachine')

    return db.collection<UserData>('UserData')
}

export async function Fetch(user: string): Promise<UserData | null> {
    const user_data_collection = await connectToDatabase();
    const userDataFromDB = await user_data_collection.findOne({ _id: user });

    // Check if userDataFromDB is not null
    if (userDataFromDB) {
        // Use type assertion here
        return userDataFromDB;
    }
    else {
        const defaultData = new UserData()
        await user_data_collection.insertOne({ _id: user, ...defaultData })
        return Fetch(user)
    }
}


export async function Update(user: UserData) {
    const user_data_collection = await connectToDatabase();

    console.log(user)
    
    try {
        const result = await user_data_collection.updateOne({ _id: user._id }, { $set: {...user} })
        console.log(result.matchedCount)
    } catch (error) {
        console.error('Error updating database: ' + error)
    }

    console.log(user)
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