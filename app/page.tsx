'use client'

import Image from 'next/image'
import NavBar from './components/NavBar/nav-bar'
import Footer from './components/footer'
import CommandPanel from './components/command_panels/command-panels'

export default function Home() {
  return (
    
    <main className='bg-twm'>
      <NavBar />
      <div className='font-main my-32 mx-10'>
        <h1 className='text-7xl text-twm-highlight'>The World Machine</h1>
        <h1 className='text-3xl my-4'>a discord bot based off oneshot</h1>
        <button onClick={() => window.location.href = '/invite'} className='bg-twm-highlight text-white p-3 rounded-lg hover:cursor-pointer hover:animate-pulse text-3xl my-5'>Invite Now</button>
        <button onClick={() => window.location.href = 'https://store.steampowered.com/app/420530/OneShot/'} className='bg-twm-highlight text-white p-3 rounded-lg hover:cursor-pointer hover:animate-pulse text-3xl my-10'>Buy OneShot</button>

      </div>
      <div className='mt-96'></div>
      <Footer/>
    </main>
  )
}
