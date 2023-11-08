import { Item, Background, UserData } from '../components/database-parse-type';
import { useState } from 'react';
import Image from 'next/image'

export default function BaseShopContainer({ item, additionalHTML = <div></div> }: { item: Item, user: UserData, additionalHTML: React.ReactNode }) {

    return (
        <div className='bg-glens-dark rounded-xl grid grid-cols-[100px_auto] grid-flow-dense xl:min-w-[600px] md:min-w-0 max-w-[600px] mx-auto my-5'>

            <Image src={`https://cdn.discordapp.com/emojis/${item.image}.png`} alt={item.name} width={50} height={0} className='align-middle m-auto'/>

            <div className='mr-3'>
                <h1 className='text-2xl mt-3 text-glens-highlight'>{item.name}</h1>
                <p className='text-lg text-white'>{item.description}</p>

                {additionalHTML}
            </div>
        </div>
    )
}