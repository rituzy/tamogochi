export type Pet = {
  id: string,
  name: string,
  level: number,
  hunger: number,
  happiness: number,
  energy: number,
  health: number,
  knowledge: number,
  feedBonus: number,
  happyBonus: number,
  lastFeed: Date,
  lastPlay: Date,
  lastSleep: Date,
  lastEducate: Date,
  accessories: string,
  owner: number,
  ownerId: string,
  createdAt: Date,
  updatedAt: Date
}

export type TelegramUser = {
  id: number,
  first_name: string,
  last_name: string,
  username: string,
  language_code: string,
  photo_url: string,
  is_premium: boolean
};