import React from 'react'
import Image from 'next/image'
import {useSession, signIn, signOut} from "next-auth/react";

export default function SignIn() {

    const startSignIn = () => {
        signIn("discord", {callbackUrl: "/profile"})
    }

    const {data: session, status} = useSession();

    if (!session && status !== 'loading') {
        return (
            <div onClick={startSignIn} className='flex justify-between mx-8 my-10 bg-twm-highlight w-auto h-auto rounded-lg hover:cursor-pointer'>
                <Image src='/discord-mark-white.svg' alt='discord' width={25} height={0} className="ml-5 mr-5"/>
                <p className="text-white align-middle my-[5px] text-lg mr-5">Sign In</p>
            </div>
        )
    }
    else if (status === 'loading') {
        return (
            <div className='flex justify-between mx-8 my-10 bg-twm-highlight w-auto h-auto rounded-lg hover:cursor-pointer'>
                <Image src='/discord-mark-white.svg' alt='discord' width={25} height={0} className="ml-5 mr-5"/>
                <p className="text-white align-middle my-[5px] text-lg mr-5">...</p>
            </div>
        )
    }

    if (session) {
        return(
            <div onClick={() => window.location.href = '/profile'} className='grid grid-cols-[20px_150px] place-content-center mx-8 my-10 bg-twm-highlight max-w-[200px] rounded-lg hover:cursor-pointer'>
                <Image src={session.user?.image ?? '/discord-mark-white.svg'} alt='discord' width={25} height={0} className="mx-5 my-2 rounded-full"/>
                
                <p className={`text-white my-[5px] mx-auto text-md text-ellipsis text-center`}>{session.user?.name}</p>
            </div>
        )
    }
}