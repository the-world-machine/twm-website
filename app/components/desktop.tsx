'use client'
import Footer from '../components/footer'
import Navigation from '../components/navigation'
import { ReactNode } from 'react'

export default function Desktop(props: { children: ReactNode; }) {
  return (
    <main className='desktop bg-[#167E95] h-screen'>
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
