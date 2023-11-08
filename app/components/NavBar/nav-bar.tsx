'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import RedirectButton from './redirect-button'
import SignIn from './discord'
export default function NavBar() {

    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Function to set the scale to 100
    const openMenu = () => {

        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    // create a function that changes the page to #
    const handleClick = () => {
        window.location.href = '/'
    }

    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    
        setIsMobile(mobileRegex.test(userAgent));
      }, []);

    if (isMobile) {
        return (
            <div>
                <div className="flex justify-between p-5 bg-twm-logo-bg w-full h-full font-main">
                    <h1 onClick={handleClick} className='text-3xl text-twm-highlight mt-8 ml-4 hover:cursor-pointer hover:scale-105 transition-transform duration-200 hover:text-twm-sun'>The World Machine</h1>
                    <SignIn />
                    <Image onClick={openMenu} src="/hamburger-mmm.svg" alt="hamburgermenu" width={50} height={20} fill={false} />
                </div>
                <div className={`absolute w-1/2 h-1/2 bg-twm-logo-bg flex flex-col justify-evenly font-main origin-top ${open ? "menu-open" : "menu-hidden"}`}>
                    <RedirectButton text="Invite" page="/invite" />
                    <RedirectButton text="Shop" page="/shop" />
                    <RedirectButton text="Profile" page="/profile" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-between p-5 bg-twm-logo-bg w-full h-full font-main">
            <h1 onClick={handleClick} className='text-5xl text-twm-highlight mt-8 ml-4 hover:cursor-pointer hover:scale-105 transition-transform duration-200 hover:text-twm-sun'>The World Machine</h1>
            <div className='flex justify-between my-10'>
                <RedirectButton text="Invite" page="/invite" />
                <RedirectButton text="Commands" page="/commands" />
                <RedirectButton text="Shop" page="/shop" />
                <RedirectButton text="Profile" page="/profile" />
            </div>

            <SignIn />
        </div>
    )
}