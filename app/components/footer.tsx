'use client'

import DiscordLogin from './discord'

export default function Footer() {
    return (
        <div className="window h-10 bottom-0 fixed w-screen z-20">
            <div className="mt-[2px] flex justify-between">
                <DiscordLogin/>
                <p className='text-lg text-black right-5 hidden md:visible md:text-2xl md:mt-0'>The World Machine</p>

                <div className='mr-2 my-auto'>
                    <button onClick={() => window.location.href = '/privacy-policy'}>Privacy Policy</button>
                    <button onClick={() => window.location.href = '/terms-and-conditions'}>Terms and Conditions</button>
                </div>
            </div>
         </div>
    )
}