'use client'
import Footer from './components/footer'
import Navigation from './components/navigation'
import Window from './components/window'

interface PageProps {
  children: React.ReactNode
}

export default function Desktop({ children }: PageProps) {
  return (
    <main className='desktop bg-[#167E95] h-screen'>
      <div>{children}</div>
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
