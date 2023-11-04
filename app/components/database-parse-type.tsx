
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

export interface UserData {
  p_key: string;
  gpt_limit: number;
  daily_wool_timestamp: string;
  daily_sun_timestamp: string;
  gpt_timestamp: string;
  unlock_notifications: string;
  unlocked_backgrounds: number[];
  equipped_background: number;
  profile_description: string;
  wool: number;
  translation_language: string;
}

export interface NikogotchiData {
  p_key: number;
  pancakes: number;
  golden_pancakes: number;
  glitched_pancakes: number;
  nikogotchi_available: number;
  rarity: number;
  treasure: number[];
}

export interface Background {
  p_key: number;
  name: string;
  image: string;
  type: string;
}