'use client'
import { useState, useCallback } from "react";
import { useSession, signIn } from "next-auth/react"
import Image from 'next/image'
import axios from "axios";
import NavBar from '../components/NavBar/nav-bar'
import Footer from '../components/footer'
import Wool from '../components/shop/wool-icon'

import TreasureContainer from "./treasure-container";
import Sell from "./sell-container";
import BackgroundContainer from "./background-container";
import CapsulesContainer from "./capsules-container";
import PancakeContainer from "./pancakes-container";

import { UserData, Background, NikogotchiData, Item, Shop } from "../components/database-parse-type";
import Treasure from "./treasure-container";

export default function Shop() {

    const [hasBeenCalled, setBeenCalled] = useState(false);
    const [pageStatus, setPageStatus] = useState('loading');
    const [userData, setUserData] = useState<UserData>({} as UserData);
    const [ownedBackgrounds, setOwnedBackgrounds] = useState<number[]>([]);
    const [ownedTreasures, setOwnedTreasures] = useState<number[]>([]);
    const [nikogotchiData, setNikogotchiData] = useState<NikogotchiData>({} as NikogotchiData);

    const [treasures, setTreasures] = useState<Item[]>([]);

    const [ownedCapsules, setOwnedCapsules] = useState<number>(0);
    const [capsules, setCapsules] = useState<Item[]>([]);
    const [pancakes, setPancakes] = useState<Item[]>([]);

    const [backgroundStock, setBackgroundStock] = useState<Background[]>([]);
    const [treasureStock, setTreasureStock] = useState<Item[]>([]);
    const [stockPrice, setStockPrice] = useState<number>(100);

    const { data, status } = useSession();

    const OnBGPurchase = (background: Background, user: UserData) => {

        let oBGs: number[] = ownedBackgrounds;

        oBGs.push(background.p_key - 1);

        const newBackgrounds = JSON.stringify(oBGs);

        user.unlocked_backgrounds = newBackgrounds;

        user.wool -= background.cost

        setUserData(user);
        setOwnedBackgrounds([...oBGs]);
        
        UpdateDatabase('user_data', 'unlocked_backgrounds', newBackgrounds, userData?.p_key as string);
        UpdateDatabase('user_data', 'wool', user.wool, userData?.p_key as string);
    }

    const OnPurchase = (item: Item, user: UserData) => {

        let price = item.price;

        if (item.type === 'treasure') {

            price = Math.floor(item.price * (stockPrice / 100));

            const getTreasure = ownedTreasures
            getTreasure[item.p_key - 1] += 1;

            setOwnedTreasures([...getTreasure]);
            UpdateDatabase('nikogotchi_data', 'treasure', JSON.stringify(getTreasure), userData?.p_key as string);
        }

        if (item.type === 'common' || item.type === 'uncommon' || item.type === 'rare' || item.type === 'epic') {

            let capsuleRarity = 0

            if (item.type === 'uncommon') {
                capsuleRarity = 1
            }

            if (item.type === 'rare') {
                capsuleRarity = 2
            }

            if (item.type === 'epic') {
                capsuleRarity = 3
            }

            setOwnedCapsules(1);

            const nikogotchi = { ...nikogotchiData };
            nikogotchi.nikogotchi_available = 1;
            nikogotchi.rarity = capsuleRarity
            
            UpdateDatabase('nikogotchi_data', 'nikogotchi_available', ownedCapsules, userData?.p_key as string);
            UpdateDatabase('nikogotchi_data', 'rarity', capsuleRarity, userData?.p_key as string);

            setNikogotchiData(nikogotchi);
        }

        if (item.type === 'pancake' || item.type === 'golden_pancake' || item.type === 'glitched_pancake') {
            
            const nikogotchi = { ...nikogotchiData };

            if (item.type === 'pancake') {
                nikogotchi.pancakes += 1;

                UpdateDatabase('nikogotchi_data', 'pancakes', nikogotchi.pancakes, userData?.p_key as string);
            }

            if (item.type === 'golden_pancake') {
                nikogotchi.golden_pancakes += 1;

                UpdateDatabase('nikogotchi_data', 'golden_pancakes', nikogotchi.golden_pancakes, userData?.p_key as string);
            }

            if (item.type === 'glitched_pancake') {
                nikogotchi.glitched_pancakes += 1;

                UpdateDatabase('nikogotchi_data', 'glitched_pancakes', nikogotchi.glitched_pancakes, userData?.p_key as string);
            }

            setNikogotchiData(nikogotchi);
        }

        user.wool -= price;

        setUserData(user);

        UpdateDatabase('user_data', 'wool', user.wool, userData?.p_key as string);
    }

    const OnSell = (item: Item, user: UserData, amount: string) => {

        const getTreasure = ownedTreasures

        let price = Math.floor(item.price * (stockPrice / 100));

        UpdateDatabase('user_data', 'wool', userData?.wool + price, userData?.p_key as string);

        if (amount === 'all') {

            price = price * ownedTreasures[item.p_key - 1];    

            getTreasure[item.p_key - 1] = 0;

            UpdateDatabase('nikogotchi_data', 'treasure', JSON.stringify(getTreasure), userData?.p_key as string);        
        } else {
            getTreasure[item.p_key - 1] -= 1;

            UpdateDatabase('nikogotchi_data', 'treasure', JSON.stringify(getTreasure), userData?.p_key as string);
        }
        
        UpdateDatabase('user_data', 'wool', user.wool + price, userData?.p_key as string);

        user.wool += price;

        setUserData(user);
        setOwnedTreasures([...getTreasure]);
    }

    const getUserData = useCallback((userID: string) => {

        async function fetchObject(table: string) {
          try {
            const response = await fetch('/api/db/get', {
              method: 'POST',
              headers: {
                table: table,
                p_key: 'all',
                key: process.env.NEXT_PUBLIC_DB_KEY as string,
              },
            });
      
            if (response.status !== 200) {
              return null;
            }

            return JSON.parse(response.headers.get('data') as string);
          } catch (error) {
            console.error('Error fetching background data:', error);
            return null;
          }
        }

        async function fetchNikogotchiData(p_key: string) {
            try {
            const response = await fetch('/api/db/get', {
                method: 'POST',
                headers: {
                table: 'nikogotchi_data',
                p_key: p_key,
                key: process.env.NEXT_PUBLIC_DB_KEY as string,
                },
            });

            return JSON.parse(response.headers.get('data') as string);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function fetchShopData() {
            try {
                const response = await fetch('/api/db/get', {
                    method: 'POST',
                    headers: {
                        table: 'shop_data',
                        p_key: '0',
                        key: process.env.NEXT_PUBLIC_DB_KEY as string,
                    },
                });

                return JSON.parse(response.headers.get('data') as string);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        function updateShopData(shopData: Shop, treasures: Item[], backgrounds: Background[], midnightTimestamp: number) {

            function shuffleArray(array: any[]) {
                for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
                }
            }

            const reroll = (minValue: number, maxValue: number, numOfRolls: number) => {

                const allValues = Array.from({ length: maxValue - minValue + 1 }, (_, i) => i + minValue);
                shuffleArray(allValues);

                return allValues.slice(0, numOfRolls);
            };

            // If yes, update the last_reset_date to the current day's midnight timestamp
            shopData.last_reset_date = midnightTimestamp;

            shopData.treasure = JSON.stringify(reroll(1, treasures.length, 3));
            shopData.backgrounds = JSON.stringify(reroll(7, backgrounds.length, 3));

            // Reroll stock_price
            shopData.stock_price = Math.floor(Math.random() * (200 - 20 + 1)) + 20;

            // Update the database
            UpdateDatabase('shop_data', 'last_reset_date', shopData.last_reset_date, '0');
            UpdateDatabase('shop_data', 'treasure', shopData.treasure, '0');
            UpdateDatabase('shop_data', 'backgrounds', shopData.backgrounds, '0');
            UpdateDatabase('shop_data', 'stock_price', shopData.stock_price, '0');
            
            console.log(shopData);

            return shopData;
        }
      
        async function fetchData() {
          try {
            const response = await fetch('/api/db/get', {
                method: 'POST',
                headers: {
                    table: 'user_data',
                    p_key: userID,
                    key: process.env.NEXT_PUBLIC_DB_KEY as string,
                },
            });
        
            if (response.status === 401 || response.status === 503) {
                console.error('Error fetching data');
                setPageStatus('error');
                return;
            }
        
            const user = JSON.parse(response.headers.get('data') as string);
            user.p_key = userID;

            const unlockedBackgroundIDs = JSON.parse(user.unlocked_backgrounds as string);
            setOwnedBackgrounds(unlockedBackgroundIDs);

            const backgrounds: Background[] = await fetchObject('Backgrounds');
            const treasures: Item[] = await fetchObject('Treasures');
            const capsules: Item[] = await fetchObject('capsules');
            const pancakes: Item[] = await fetchObject('pancakes');

            const nikogotchi: NikogotchiData = await fetchNikogotchiData(user.p_key as string);

            console.log(nikogotchi);

            let shopData: Shop = await fetchShopData();

            // Calculate current Unix timestamp for midnight of the current day
            const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
            const midnightTimestamp = currentTimestamp - (currentTimestamp % 86400); // Midnight of the current day

            console.log(midnightTimestamp);

            // Check if 24 hours have passed since the last reset date
            if (midnightTimestamp - shopData.last_reset_date >= 86400) {
                shopData = updateShopData(shopData, treasures, backgrounds, midnightTimestamp);
            }

            console.log(shopData);

            setCapsules(capsules);
            setPancakes(pancakes);
            setOwnedCapsules(nikogotchi.nikogotchi_available);
            setOwnedTreasures(JSON.parse(nikogotchi.treasure as string));
            setTreasures(treasures);
            setStockPrice(shopData.stock_price);
            setNikogotchiData(nikogotchi);
            
            const backgroundStockIDs = JSON.parse(shopData.backgrounds as string);
            const treasureStockIDs = JSON.parse(shopData.treasure as string);

            console.log(nikogotchi.treasure);

            let backgroundStock: Background[] = [];
            let treasureStock: Item[] = []; 

            backgroundStockIDs.forEach((backgroundID: number) => {
                const background = backgrounds.find((background) => background.p_key === backgroundID);

                if (background) {
                    backgroundStock.push(background);
                }
            })

            treasureStockIDs.forEach((itemID: number) => {
                const item = treasures.find((item) => item.p_key === itemID);

                if (item) {
                    treasureStock.push(item);
                }
            })

            console.log(treasureStock);

            setBackgroundStock(backgroundStock);
            setTreasureStock(treasureStock);

            setUserData(user);
            setPageStatus('success');
            } catch (error) {
                console.error('Error fetching data:', error);
                setPageStatus('error');
            }
        }
      
        return fetchData();
      }, []);

      const UpdateDatabase = useCallback((table: string, column: string, data: any, userID: string) => {

        async function updateData() {
  
          try {
            const response = await fetch('/api/db/update', {
                method: 'POST',
                headers: {
                    table: table,
                    p_key: userID,
                    column: column,
                    data: data,
                    key: process.env.NEXT_PUBLIC_DB_KEY as string
                }
            })
  
            if (response.status === 401 || response.status === 503) {
  
              console.error('Error fetching data.')
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
  
        updateData();
    }, [])

    if (data?.access_token && !hasBeenCalled) {
        // Make the API call
        axios.get('https://discord.com/api/users/@me', {
            headers: {
            Authorization: `Bearer ${data.access_token}`,
            },
        })
        .then((response) => {
            const user_data = response.data;

            getUserData(user_data.id);
        })
        .catch((error) => {
            console.error('Error fetching user data from Discord:', error);
        });
        
        // Update the state variable to indicate that the function has been called
        setBeenCalled(true);
        }

        if (!data) {
            return (
                <div>
                    <NavBar />
                    <div className='font-main my-32 mx-10 grid place-content-center'>
                        <h1 className='text-5xl text-twm-sun text-center'>Profile</h1>
                        <p   className='text-xl mt-5 text-center'>You need to be signed in to access this page!</p>
                        <button onClick={() => signIn('discord')} className='bg-glens-highlight text-white p-3 rounded-lg hover:cursor-pointer hover:animate-pulse text-3xl my-10'>Sign In</button>
                    </div>
                    <Footer />
                </div>
            )
        }

        if (pageStatus === 'loading') {
            return (
                <div>
                    <NavBar />
                    <div className='font-main my-32 mx-10 grid place-content-center'>
                        <h1 className='text-5xl text-twm-sun text-center'>Shop</h1>
                        <p className='text-xl mt-5 text-center'>Fetching Shop Data...</p>
                    </div>
                    <Footer />
                </div>
            )
        }

        if (pageStatus === 'error') {
            return ErrorPage();
        }
        
        if (pageStatus === 'success') {
            return Page(userData as UserData);
        }

    function Page(user: UserData) {

        const treasuresToSell = false;

        return(
            <div className="bg-gradient-to-b from-[#009999] via-[#283777] to-[#652E9A]">
                <NavBar />

                <p className='bg-glens-dark rounded-xl my-5 sm:mx-auto lg:mx-5 font-main max-w-[300px] p-3 text-center sticky top-5 flex sm:justify-center'> Current Balance: <Wool /> {(user.wool).toLocaleString(undefined)}</p>
                <div className='font-main my-32 mx-10 flex justify-center flex-col'>

                    <h1 className='text-5xl text-twm-sun text-center'>Shop</h1>
                    <p className='text-2xl my-5 text-center text-glens-highlight'>Welcome to the shop!</p>

                    <div className='m-auto max-w-[800px] min-w-0'>
                        <p className='text-xl my-3 mx-3 flex justify-center text-center'>Here you can exchange your wool for some colorful and shiny backgrounds, capsules and more! You can even sell any sparkly treasures you find here too! As a seasoned merchant and purveyor of fine goods, I can assure you that my stock is always worth checking out.</p>
                    </div>

                    <a href="#buy-treasures" className="text-2xl p-3 bg-glens-light rounded-xl my-5 mx-auto text-center">Buy Treasures</a>
                    <a href="#sell-treasures" className="text-2xl p-3 bg-glens-light rounded-xl my-5 mx-auto text-center">Sell Treasures</a>
                    <a href="#buy-backgrounds" className="text-2xl p-3 bg-glens-light rounded-xl my-5 mx-auto text-center">Buy Backgrounds</a>
                    <a href="#buy-capsules" className="text-2xl p-3 bg-glens-light rounded-xl my-5 mx-auto text-center">Buy Capsules</a>

                    <hr id='buy-treasures' className='my-10'/>

                    <h1 className='text-2xl text-twm-sun text-center'>Buy Treasures</h1>

                    <p className='text-xl my-3 flex justify-center text-center'>Current Stock Value: {stockPrice}%</p>

                    {treasureStock.map((treasure) => (
                        <TreasureContainer key={treasure.p_key} item={treasure} user={user} ownedTreasure={ownedTreasures} stockPrice={stockPrice} onPurchase={(item: Item) => OnPurchase(item, user)}/>
                    ))}

                    <hr id='sell-treasures' className='my-10'/>

                    <h1 className='text-2xl text-twm-sun text-center'>Sell Treasures</h1>

                    {ownedTreasures.every(amount => amount === 0) ? (
                        <p className="text-xl mx-auto">No treasures to sell.</p>
                    ) : (
                        ownedTreasures.map((amount, index) => (
                            (amount === 0) ? (
                                <div key={treasures[index].p_key} />
                            ) : (
                                <Sell
                                    key={treasures[index].p_key}
                                    treasure={treasures[index]}
                                    stockPrice={stockPrice}
                                    amount={amount}
                                    onSell={(item, amount) => OnSell(item, user, amount)}
                                />
                            )
                        ))
                    )}

                    <hr id='buy-backgrounds' className='my-10'/>

                    <h1 className='text-2xl mb-5 text-twm-sun text-center'>Buy Backgrounds</h1>

                    <BackgroundContainer background={backgroundStock} user={user} BuyBackground={(bg: Background) => OnBGPurchase(bg, user)}/>
                    
                    <hr id='buy-capsules' className='my-10'/>

                    <h1 className='text-2xl mb-5 text-twm-sun text-center'>Buy Capsules</h1>
                    
                    <p className='text-xl my-3 flex justify-center text-center max-w-[600px] mx-auto'>Want a companion for your journey? Now you can by buying one of these capsules! By purchasing one, you can unlock a random Nikogotchi to take care of! The rarer the capsule, the cooler the Nikogotchi!

After purchasing a Nikogotchi, run the /nikogotchi check command to see your new friend! Make sure to take care of them, as if any of their needs are not met, they will lose health and die...

By feeding them using pancakes, giving them attention and cleaning them, your Nikogotchi will live for a very long time! Cleaning them and giving them attention is easy enough, but you'll need to buy pancakes from me!

Just keep in mind that you can only have one Nikogotchi at a time. The only way to get another one is to send away your current one or if it has passed away.</p>

                    {capsules.map((capsule) => (
                        <CapsulesContainer key={capsule.p_key} item={capsule} user={user} nikogotchi={nikogotchiData} onPurchase={(item: Item) => OnPurchase(item, user)}/>
                    ))}

                    <hr id='pancakes' className='my-10'/>

                    <h1 className='text-2xl mb-5 text-twm-sun text-center'>Buy Pancakes</h1>

                    <p className='text-xl my-3 flex justify-center text-center max-w-[600px] mx-auto'>
                        Use these pancakes to feed your Nikogotchi!
                    </p>

                    {pancakes.map((pancake) => (
                        <PancakeContainer key={pancake.p_key} item={pancake} user={user} nikogotchi={nikogotchiData} onPurchase={(item: Item) => OnPurchase(item, user)}/>
                    ))}
                </div>

                <Image src='/certified-stock-market-crasher.png' alt='certified stock market crasher' width={50} height={0} className='mx-auto flex justify-center'/>

                <Footer />
            </div>
        )
    }

    function ErrorPage() {
        return(
            <div>
                <NavBar />
                <div className='font-main my-32 mx-10 grid place-content-center'>
                    <h1 className='text-5xl text-twm-sun text-center'>Shop</h1>
                    <p className='text-xl mt-5 text-center'>An error has occurred. Please try again later.</p>
                </div>
                <Footer />
            </div>
        )
    }
}