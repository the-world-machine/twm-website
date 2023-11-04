import React from 'react'
import Image from 'next/image'
import NavBar from './components/NavBar/nav-bar'
import Footer from './components/footer'

export default function NotFound() {
    return (
        <div>
            <NavBar />
            <div className='grid place-items-center font-main'>
                <Image src="/pnf.png" alt="logo" width={600} height={100} className='my-10'/>
                <h1 className='text-3xl'>404 - Page Not Found</h1>
            </div>
            <Footer />
        </div>
    )
}