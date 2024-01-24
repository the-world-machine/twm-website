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
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
}

module.exports = nextConfig

require('dotenv').config({
    path: '.env.local'
  });