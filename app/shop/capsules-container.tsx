import BaseShopContainer from "./shop-container";
import { Item, NikogotchiData, UserData } from "../components/database-parse-type";
import Wool from "../components/shop/wool-icon";

export default function Capsules({ item, user, nikogotchi, onPurchase }: { item: Item, user: UserData, nikogotchi: NikogotchiData, onPurchase: (item: Item) => void }) {

    function NikogotchiCheck() {
        if (nikogotchi.nikogotchi_available > 0) {
            return (
                <div className='bg-glens-light opacity-20 rounded-xl mr-2 py-2 px-10 hover:cursor-not-allowed flex select-none'>
                    Owned
                </div>
            )
        } else if (user.wool >= item.price) {
            return (
                <div onClick={() => onPurchase(item)} className='bg-glens-light rounded-xl mr-2 py-2 px-10 hover:cursor-pointer flex select-none'>
                    Buy
                </div>
            )
        } else {
            return (
                <div className='bg-glens-light opacity-20 rounded-xl mr-2 py-2 px-10 hover:cursor-not-allowed flex select-none'>
                    Buy
                </div>
            )
        }
    }

    const price = () => {
        return <p className='flex mt-3'>Cost: <Wool />{item.price}</p>
    }

    return(
        <BaseShopContainer item={item} user={user} additionalHTML={
            <div>
                {price()}
                <div>
                    <div className="flex my-4">
                        <NikogotchiCheck />
                    </div>
                </div>
            </div>
        }/>

    )
}
