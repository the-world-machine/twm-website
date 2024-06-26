'use server'
import axios from 'axios';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { UserData, LeaderboardUser, ItemData } from './components/database-parse-type'

let collection: null | Collection<UserData> = null

async function connectToDatabase(collection_to_use: string = 'UserData') {

    if (collection != null) { return collection }

    const uri = process.env.NEXT_PUBLIC_DB_URI as string

    const mongoDBClient: MongoClient = new MongoClient(uri)

    await mongoDBClient.connect()

    const db = mongoDBClient.db('TheWorldMachine')

    return db.collection<UserData>(collection_to_use)
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

export async function GetLeaderboard(sortBy: string) {
    
    const user_data_collection = await connectToDatabase();

    const leaderboard: LeaderboardUser[] = []

    try {
        const cursor = await user_data_collection.aggregate([{ $sort: { [sortBy]: -1 } }, { $limit: 10 }])

        const result = await cursor.toArray();

        const userPromises = result.map(async (doc) => {
            const user = await GetDiscordData(doc._id);

            return { name: user.username, type: sortBy, data: { ...doc } as UserData };
        });

        // Use Promise.all to wait for all promises to resolve
        const leaderboardData = await Promise.all(userPromises);

        // Push the resolved data to the leaderboard array
        leaderboard.push(...leaderboardData);
    } catch (error) {
        console.error(error);
    }

    return leaderboard;
}

export async function FetchItemData() {

    const data = await connectToDatabase('ItemData');

    const itemData = await data.findOne({ access: 'ItemData' });

    if (itemData) {
        return itemData as unknown as ItemData;
    } else {
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