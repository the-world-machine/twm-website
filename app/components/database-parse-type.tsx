
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
  badge_notifications: string;
  owned_backgrounds: string[] | string;
  equipped_bg: string;
  profile_description: string;
  wool: number;
  translation_language: string;
}

export interface NikogotchiData {
  p_key: number;
  data: string;
  pancakes: number;
  golden_pancakes: number;
  glitched_pancakes: number;
  nikogotchi_available: number;
  rarity: number;
  treasure: string | number[];
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

export interface Shop {
  p_key: number;
  backgrounds: number[] | string;
  last_reset_date: number;
  treasure: string | number[];
  stock_price: number;
}