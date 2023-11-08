import BaseShopContainer from "./shop-container";
import { Item, Background, UserData, NikogotchiData } from "../components/database-parse-type";
import Wool from "../components/shop/wool-icon";

export default function Pancakes({ item, user, nikogotchi, onPurchase }: { item: Item, user: UserData, nikogotchi: NikogotchiData, onPurchase: (item: Item) => void }) {

    function PancakesOwned() {
        if (item.type === "pancake") {
            return <p className='mb-4'>You currently own: {nikogotchi.pancakes}</p>
        }

        if (item.type === "golden_pancake") {
            return <p className='mb-4'>You currently own: {nikogotchi.golden_pancakes}</p>
        }

        if (item.type === "glitched_pancake") {
            return <p className='mb-4'>You currently own: {nikogotchi.glitched_pancakes}</p>
        }

        return <p></p>
    }

    return(
        <BaseShopContainer item={item} user={user} additionalHTML={
            <div>
                <div className='flex mt-3'>Cost: <Wool />{item.price}</div>
                <div>
                    <div className="flex mt-4">
                        {
                            (user.wool >= item.price) ? (
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

                    <PancakesOwned />
                </div>
            </div>
        }/>

    )
}
