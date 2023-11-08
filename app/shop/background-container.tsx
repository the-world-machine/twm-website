import { Background, UserData } from "../components/database-parse-type";
import { useState } from "react";
import Wool from "../components/shop/wool-icon";
import Image from 'next/image'

export default function BackgroundContainer({background, user, BuyBackground} : { background: Background[], user: UserData, BuyBackground: (background: Background) => void }) {

    const [selectedBackground, setSelectedBackground] = useState(0);

    const UpdateBackground = (e: number, prev = false) => {
        if (prev == true && (e - 1) == -1) {
            setSelectedBackground(background.length - 1);
            return;
        }

        if (prev == false && (e + 1) == background.length) {
            console.log('reset');
            setSelectedBackground(0);
            return;
        }

        if (prev) {
            setSelectedBackground(selectedBackground - 1);
        } else {
            setSelectedBackground(selectedBackground + 1);
        }
    }

    function BuyButton () {
        if (user.wool < background[selectedBackground].cost) {
            return (
                <button className='bg-glens-light opacity-20 rounded-xl mx-auto my-5 py-2 px-10 hover:cursor-not-allowed select-none'>
                    Buy
                </button>
            )
        } else if ((user.unlocked_backgrounds as number[]).includes(background[selectedBackground].p_key - 1)) {
            return (
                <button className='bg-glens-light opacity-20 rounded-xl mx-auto my-5 py-2 px-10 hover:cursor-not-allowed select-none'>
                    Owned
                </button>
            )
        } else {
            return (
                <button onClick={() => BuyBackground(background[selectedBackground])} className='bg-glens-light rounded-xl mx-auto my-5 py-2 px-10 hover:cursor-pointer'>
                    Buy
                </button>
            )
        }
    }

    return (
        <div className='bg-glens-dark rounded-xl max-w-[600px] mx-auto'>
            <p className='text-xl mt-3 text-glens-highlight text-center'>{background[selectedBackground].name}</p>
            <Image src={background[selectedBackground].image} alt={background[selectedBackground].name} width={600} height={0} className='mx-auto mb-5 p-3'/>

            <p className='text-lg text-white text-center flex justify-center'>Price: <Wool />{background[selectedBackground].cost}</p>

            <div className="flex justify-center mx-3">
                <button onClick={() => UpdateBackground(selectedBackground, true)} className='bg-glens-light rounded-xl mx-auto my-5 py-2 px-10 hover:cursor-pointer'>{'<'}</button>
                <BuyButton />
                <button onClick={() => UpdateBackground(selectedBackground)} className='bg-glens-light rounded-xl mx-auto my-5 py-2 px-10 hover:cursor-pointer'>{'>'}</button>
            </div>
        </div>
    )
}