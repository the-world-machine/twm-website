
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

export interface UserInfo {
  name: string;
  image: string;
}

export interface UserData {
  p_key: string;
  gpt_limit: number;
  daily_wool_timestamp: string;
  daily_sun_timestamp: string;
  gpt_timestamp: string;
  unlock_notifications: string;
  unlocked_backgrounds: number[] | string;
  equipped_background: number;
  profile_description: string;
  wool: number;
  translation_language: string;
  times_messaged: number;
  times_shattered: number;
  times_asked: number;
  times_transmitted: number;
}

export interface NikogotchiData {
  p_key: number;
  pancakes: number;
  golden_pancakes: number;
  glitched_pancakes: number;
  nikogotchi_available: number;
  rarity: number;
  treasure: string | number[];
}

export interface Background {
  p_key: number;
  name: string;
  cost: number;
  image: string;
  type: string;
}

export interface Item {
  p_key: number;
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
}

export interface Shop {
  p_key: number;
  backgrounds: number[] | string;
  last_reset_date: number;
  treasure: string | number[];
  stock_price: number;
}