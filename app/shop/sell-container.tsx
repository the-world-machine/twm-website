import { Item, Background, UserData } from "../components/database-parse-type";
import Wool from "../components/shop/wool-icon";
import Image from 'next/image'

export default function Sell({ treasure, stockPrice, amount, onSell }: { treasure: Item, stockPrice: number, amount: number, onSell: (item: Item, amount: string) => void }) {
    return (
        <div className='bg-glens-dark rounded-xl grid grid-cols-[100px_auto] grid-flow-dense xl:min-w-[600px] md:min-w-0 max-w-[600px] mx-auto my-5'>

            <Image src={`https://cdn.discordapp.com/emojis/${treasure.image}.png`} alt={treasure.name} width={50} height={0} className='align-middle m-auto'/>

            <div className='mr-3'>
                <h1 className='text-xl mt-3 text-glens-highlight'>{treasure.name}</h1>
                <p className='text-lg text-white'>{treasure.description}</p>
                <p className='text-lg text-white flex'>Sell Price: <Wool />{Math.floor(treasure.price * (stockPrice / 100))}</p>

                <div className="my-3 mx-auto">
                    <div onClick={() => onSell(treasure, '1')} className='bg-glens-light rounded-xl mr-2 py-2 px-10 hover:cursor-pointer select-none whitespace-nowrap text-center'>Sell 1</div>
                    <div onClick={() => onSell(treasure, 'all')} className='bg-glens-light mt-3 rounded-xl mr-2 py-2 px-10 hover:cursor-pointer select-none whitespace-nowrap text-center'>Sell All</div>
                </div>

                <p className='mb-4'>You currently own: {amount}</p>
            </div>
        </div>
    )
}