import React from 'react'
import Image from 'next/image'
import {useSession, signIn, signOut} from "next-auth/react";

export default function DiscordLogin() {

    const startSignIn = () => {
        signIn("discord", {callbackUrl: "/profile"})
    }

    const {data: session, status} = useSession();

    if (!session && status !== 'loading') {
        return (
            <button onClick={() => startSignIn()} className='w-auto text-lg flex ml-3'>
                <Image src='/discord-mark-white.svg' width={20} height={20} alt='discord' className='mr-3'></Image>
                Sign In
            </button>
        )
    }
    else if (status === 'loading') {
        return (
            <button className='w-auto text-lg flex ml-3'>
                    Loading
            </button>
        )
    }

    if (session) {
        return(
            <button onClick={() => signOut()} className='w-auto text-lg flex ml-3'>
                <Image src={session.user?.image ?? '/discord-mark-white.svg'} alt='discord' width={30} height={15} className="mr-3"/>
                
                Sign Out
            </button>
        )
    }
}