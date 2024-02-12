
import { ObjectId } from "mongodb";

interface OwnedTreasures {
  [treasure: string]: number;
}

export class UserData {
  constructor(
    public wool: number = 5000,
    public suns: number = 0,
    public translation_language: string = 'english',
    public profile_description: string = 'Hello!',
    public badge_notifications: boolean = true,
    public ask_limit: number = 14,
    public last_asked: Date = new Date(2000, 1, 1, 0, 0, 0),
    public daily_sun_timestamp: Date = new Date(2000, 1, 1, 0, 0, 0),
    public daily_wool_timestamp: Date = new Date(2000, 1, 1, 0, 0, 0),
    public equipped_bg: string = 'Default',
    public owned_backgrounds: string[] = ["Default", "Blue", "Red", "Green", "Pink", "Yellow"],
    public owned_badges: string[] = [],
    public owned_treasures: OwnedTreasures = {'journal': 5},
    public times_asked: number = 0,
    public times_shattered: number = 0,
    public times_transmitted: number = 0,
    public _id?: string
  ) {}
}

export interface LeaderboardUser {
  name: string,
  data: UserData
}

export function ParseType(data: string) {
  try {
    return Number(data)
  } catch (error) {
    try {
      return JSON.parse(data)
    }
    catch (error) {
      return data
    }
  }
}

export interface Background {
  name: string;
  image: string;
}

export interface Item {
  p_key: number;
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
}