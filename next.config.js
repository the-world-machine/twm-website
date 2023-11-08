/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { domains: ['cdn.discordapp.com', 'media.discordapp.net'] },
    env: {
        NEXT_PUBLIC_DISCORD_ID: process.env.NEXT_PUBLIC_DISCORD_ID,
        NEXT_PUBLIC_DISCORD_SECRET: process.env.NEXT_PUBLIC_DISCORD_SECRET,
        NEXT_PUBLIC_DB_KEY: process.env.NEXT_PUBLIC_DB_KEY,
        NEXT_PUBLIC_DB_NAME: process.env.NEXT_PUBLIC_DB_NAME,
        NEXT_PUBLIC_DB_HOST: process.env.NEXT_PUBLIC_DB_HOST,
        NEXT_PUBLIC_DB_USERNAME: process.env.NEXT_PUBLIC_DB_USERNAME,
        NEXT_PUBLIC_DB_PASSWORD: process.env.NEXT_PUBLIC_DB_PASSWORD,
        NEXT_PUBLIC_SECRET: process.env.NEXT_PUBLIC_SECRET
    }
}

module.exports = nextConfig

require('dotenv').config({
    path: '.env.local'
  });