'use client'
import React from "react";
import Image from "next/image";
import NavBar from "../components/NavBar/nav-bar";
import CommandPanel from "../components/command_panels/command-panels";
import Footer from "../components/footer";

export default function Invite() {

    const handleClick = () => {
        window.open('https://discord.com/api/oauth2/authorize?client_id=1015629604536463421&permissions=431681300544&scope=applications.commands%20bot', '_blank', 'popup width=1500 height=800');
    }

    return (
        <div className='bg-gradient-to-t from-twm-highlight to-black'>
            <NavBar />
            <div className='flex justify-center flex-col font-main my-10 mx-10'>
                <div onClick={handleClick} className='flex justify-between bg-twm-highlight text-white p-3 rounded-lg max-w-[300px] mx-auto hover:cursor-pointer scale-100 hover:scale-110 transition duration-200 my-20'>
                    <Image src='/discord-mark-white.svg' alt='discord' width={25} height={0} className="mx-2"/>
                    <h1 className="mr-2 text-3xl">Invite Now</h1>
                </div>

                <p className='text-3xl mb-10 text-twm-sun text-center'>look at these really cool features we have:</p>

                <CommandPanel image="music" title='Music' description='Play music in your server 24/7 for free, with multiple providers, such as Spotify, SoundCloud or even your own music or video files! Play Spotify playlists and albums with ease and enjoy a dynamic player so you know exactly where the music starts and stops.'/>
                <CommandPanel image="transmissions" title='Transmissions' description='Communicate with other Discord servers using Transmissions, discover different discord servers, and perhaps make new friends. Any servers you have previously transmitted with can be called again, so you can always get back to where you left off.'/>
                <CommandPanel image="nikogotchi" title='Nikogotchi' description="Take care of OneShot characters like a pet. You can feed them, pet them, send them off to find treasure, and MOST importantly, feed them pancakes. Otherwise they might perish. That might be bad."/>
                <CommandPanel image="chatgpt" title='Chat-GPT Integrations' description="Using ChatGPT, you can ask the sassy entity itself life's most important questions. Like how to make the best pancakes ever. yep."/>
                <CommandPanel image="explosions" title='Explosions' description="cause catastrophic devastation with one command. 💥"/>
            </div>
            <Footer/>
        </div>
    );
}