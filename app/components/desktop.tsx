'use client'
import Footer from '../components/footer'
import Navigation from '../components/navigation'
import { ReactNode } from 'react'

export default function Desktop(props: { children: ReactNode; }) {
  return (
    <main className='desktop bg-[#167E95] h-screen'>
      <head>
        <title>The World Machine</title>
        <meta name="description" content="The World Machine is a discord bot inspired by the game OneShot. Invite the bot to your server and get features such as music, Nikogotchis, Chat-GPT integrations and more!"/>
        
        <meta name="og:title" content="The World Machine"/>
        <meta name="og:description" content="The World Machine is a discord bot inspired by the game OneShot. Invite the bot to your server and get features such as music, Nikogotchis, Chat-GPT integrations and more!"/>
        <meta name="og:image" content="https://media.discordapp.net/attachments/1162885547749023784/1182724930652082294/twm_reallynow.png"/>
      </head>
      {props.children}
      <Navigation/>
      <div className='flex justify-between'>
        <div/>
        <p className='text-white text-2xl text-end'>The World Machine</p>
        <div/>
      </div>
      <Footer/>
    </main>
  )
}
