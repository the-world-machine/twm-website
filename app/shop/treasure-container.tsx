import BaseShopContainer from "./shop-container";
import { Item, Background, UserData } from "../components/database-parse-type";
import Wool from "../components/shop/wool-icon";

export default function Treasure({ item, user, ownedTreasure, stockPrice, onPurchase }: { item: Item, user: UserData, ownedTreasure: number[], stockPrice: number, onPurchase: (item: Item) => void }) {

    const treasureAmount = ownedTreasure[item.p_key - 1];
    
    let priceChanged = false;

    // Calculate new price.
    const newPrice = Math.floor(item.price * (stockPrice / 100));

    if (newPrice !== item.price) {
        priceChanged = true;
    }

    const price = () => {
        if (priceChanged) {
            return(
                <div className='flex mt-3'>Cost:<del className="flex mr-2"><Wool />{item.price}</del> {'>'} <Wool />{newPrice}</div>
            )
        } else {
            return(
                <div className='flex mt-3'>Cost: <Wool />{item.price}</div>
            )
        }
    }

    return(
        <BaseShopContainer item={item} user={user} additionalHTML={
            <div>
                {price()}
                <div>
                    <div className="flex mt-4">
                        {
                            (user.wool >= newPrice) ? (
                                <div onClick={() => onPurchase(item)} className='bg-glens-light rounded-xl mr-2 py-2 px-10 hover:cursor-pointer flex select-none'>
                                    Buy
                                </div>
                            ) : (
                                <div className='bg-glens-light opacity-20 rounded-xl mr-2 py-2 px-10 hover:cursor-not-allowed select-none'>
                                    Buy
                                </div>
                            )
                        }
                    </div>
                </div>

                <p className='mb-4'>You currently own: {treasureAmount}</p>
            </div>
        }/>

    )
}
