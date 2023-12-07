'use client'
import NavBar from "../components/NavBar/nav-bar";
import Footer from "../components/footer";
import { UserData, Background } from "../components/database-parse-type";
import {useSession, signIn} from "next-auth/react";
import axios from "axios";
import React, { useCallback, useState } from "react";
import BackgroundSelection from "../components/profile/background-selector";
import languages from './languages.json';
import { signOut } from "next-auth/react";
import { Fetch, Update } from "../database";

export default function Profile() {

    // initialization
    const [hasBeenCalled, setBeenCalled] = useState(false);
    
    const [pageStatus, setPageStatus] = useState('loading');
    const [userData, setUserData] = useState<null | UserData>(null);

    // backgrounds
    const [equippedBackground, setEquippedBackground] = useState<Background>({} as Background);
    const [ownedBackgrounds, setBackgrounds] = useState<Background[]>([]);
    // saving changes
    const [saveStatus, setSaveStatus] = useState('...');
    const [saved, setSaved] = useState(true);

    const [textLength, setTextLength] = useState(0);
    const [profileDescription, setProfileDescription] = useState('');

    const [translationLanguage, setTranslationLanguage] = useState('english');
     
    const [badgeNotifications, setBadgeNotifications] = useState(true);

    const { data, status } = useSession();

    function Page(user: UserData) {

      const updateProfileDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        
        setProfileDescription(e.target.value);

        setTextLength(e.target.value.length);

        console.log(profileDescription);

        setSaved(false);
        setSaveStatus('You have unsaved changes!');

      }

      const updateBackground = (background: Background) => {
        setEquippedBackground(background);

        setSaved(false);
        setSaveStatus('You have unsaved changes!');
      }

      const updateLanguage = (language: string) => {

        console.log(language)

        setTranslationLanguage(language);

        setSaved(false);
        setSaveStatus('You have unsaved changes!');
      }

      const updateBadgeNotifications = () => {
        setBadgeNotifications(!badgeNotifications);

        setSaved(false);
        setSaveStatus('You have unsaved changes!');
      }

      const SaveChanges = () => {

        if (saved) {
          return;
        }

        const backgroundID = equippedBackground?.p_key - 1;

        let description = profileDescription;

        console.log(description)

        UpdateDatabase('profile_description', description, String(user.p_key));
        UpdateDatabase('equipped_background', backgroundID, String(user.p_key));
        UpdateDatabase('translation_language', translationLanguage, String(user.p_key));
        UpdateDatabase('unlock_notifications', String(badgeNotifications), String(user.p_key));

        setSaved(true);
        setSaveStatus('Changes have been saved!');
      }

      return(
        <div className="bg-gradient-to-b from-refuge-dark to-twm-logo-bg">
            <NavBar />

            <div className='bg-refuge-light w-full sticky top-0 bg-opacity-100'>
              <div className="font-main flex justify-center">
                  <p className='text-xl text-center text-white mr-6 my-2'>{saveStatus}</p>
                  <button
                    onClick={SaveChanges}
                    type="submit"
                    className={saved ? 'bg-refuge-highlight opacity-40 text-white px-5 rounded-lg hover:cursor-not-allowed text-xl mb-2 my-2' : 'bg-refuge-highlight text-white rounded-lg px-5 hover:cursor-pointer hover:animate-pulse text-xl mb-2 my-2'}>
                      Save Changes
                  </button>
              </div>
            </div>

            <div className='font-main my-32 mx-10 grid place-content-center'>

                <h1 className='text-3xl ml-5 text-twm-sun text-center'>User Settings</h1>

                <h1 className='text-xl text-refuge-highlight text-center mt-10 mb-5'>Change Translation Language</h1>

                <select onChange={(e) => updateLanguage(e.currentTarget.value)} value={translationLanguage} className="text-white bg-refuge-highlight p-2 rounded-lg">
                  {languages.map((language) => (
                    <option key={language.value} value={language.value}>{language.name}</option>
                  ))}
                </select>

                <h1 className='text-xl text-refuge-highlight text-center mt-10 mb-5 outline-2'>Badge Notifications</h1>
                <button onClick={() => updateBadgeNotifications()} className={badgeNotifications ? 'bg-refuge-highlight text-white rounded-lg text-xl mb-10' : 'bg-gray-200 opacity-40 text-black rounded-lg text-xl mb-10'}>
                  {badgeNotifications ? 'Enabled' : 'Disabled'}
                </button>

                <hr className='my-10' />

                <h1 className='text-3xl mt-2 text-twm-sun text-center'>Profile Settings</h1>

                <h1 className='text-xl text-refuge-highlight text-center mt-5 mb-5'>Change Profile Description</h1>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={user.profile_description}
                  onChange={(e) => updateProfileDescription(e)}
                  maxLength={100}
                  className="resize-none text-white bg-refuge-light p-2 rounded-lg selection:border-4 mb-2"
                />
                <h1>{textLength}/100</h1>

                <h1 className='text-xl text-refuge-highlight text-center mt-10 mb-5'>Change Profile Background</h1>

                <BackgroundSelection ownedBackgrounds={ownedBackgrounds} equippedBackground={equippedBackground as Background} onChange={updateBackground} />
                    
                <hr className='my-10' />

                <h1 className='text-3xl mt-6 ml-5 text-twm-sun text-center'>User Stats</h1>

                <div className='flex justify-center mt-5'>
                  <h1 className='text-xl text-refuge-highlight text-center'>Total Messages Sent:</h1>
                  <p className='text-xl text-center ml-3'>{user.times_messaged}</p>
                </div>
                  
                <div className='flex justify-center mt-5'>
                  <h1 className='text-xl text-refuge-highlight text-center'>Total Times Shattered:</h1>
                  <p className='text-xl text-center ml-3'>{user.times_shattered}</p>
                </div>

                <div className='flex justify-center mt-5'>
                  <h1 className='text-xl text-refuge-highlight text-center'>Total Times Asked:</h1>
                  <p className='text-xl text-center ml-3'>{user.times_asked}</p>
                </div>

                <div className='flex justify-center mt-5'>
                  <h1 className='text-xl text-refuge-highlight text-center'>Total Times Transmitted:</h1>
                  <p className='text-xl text-center ml-3'>{user.times_transmitted}</p>
                </div>

                <p onClick={() => signOut()} className='mt-20 text-xl hover:text-twm-sun cursor-pointer flex justify-center'>Sign Out</p>
            </div>
            <Footer />
        </div>
      )
    }
    
    function ErrorPage() {
      return(
        <div>
            <NavBar />
            <div className='font-main my-32 mx-10 grid place-content-center'>
                <h1 className='text-5xl text-twm-sun text-center'>Profile</h1>
                <p className='text-xl mt-5 text-center'>An error has occurred. Please try again later.</p>
            </div>
            <Footer />
        </div>
      )
    }

    const UpdateDatabase = useCallback((column: string, data: any, userID: string) => {

      async function updateData() {

        try {
          const response = await Update('user_data', column, userID, data)

          if (response === 'error') {

            console.error('Error updating data.')
          }

        } catch (error) {
          console.error('Error updating data:', error);
        }
      }

      updateData();
    }, [])

    const getUserData = useCallback((userID: string) => {
      async function fetchBackground(backgroundID: number) {
        try {
          const response = await Fetch('Backgrounds', backgroundID);
    
          if (response === null) {
            return null;
          }

          return response[0];
        } catch (error) {
          console.error('Error fetching background data:', error);
          return null;
        }
      }
    
      async function fetchData() {
        try {
          const response = await Fetch('user_data', userID);
    
          if (response === null) {
            console.error('Error fetching data');
            setPageStatus('error');
            return;
          }
    
          const user: UserData = response[0];
          user.p_key = userID;
          
          const notifications = JSON.parse(user.unlock_notifications as string);
          
          const unlockedBackgroundIDs = JSON.parse(user.unlocked_backgrounds as string);
    
          const backgroundPromises = unlockedBackgroundIDs.map((backgroundID: number) => fetchBackground(backgroundID + 1));
    
          const backgrounds = await Promise.all(backgroundPromises);
          const equippedBackground = await fetchBackground(user.equipped_background + 1);
    
          // Filter out any null values (failed background fetches)
          const filteredBackgrounds = backgrounds.filter((background) => background !== null);
    
          setBackgrounds(filteredBackgrounds);
          setEquippedBackground(equippedBackground);

          setTextLength(user.profile_description.length);
          setTranslationLanguage(user.translation_language);
          setProfileDescription(user.profile_description);
          setBadgeNotifications(notifications);

          setUserData(user);
          setPageStatus('success');
        } catch (error) {
          console.error('Error fetching data:', error);
          setPageStatus('error');
        }
      }
    
      return fetchData();
    }, []);

    if (!data && status !== 'loading') {
        return (
            <div>
                <NavBar />
                <div className='font-main my-32 mx-10 grid place-content-center'>
                    <h1 className='text-5xl text-twm-sun text-center'>Profile</h1>
                    <p   className='text-xl mt-5 text-center'>You need to be signed in to access this page!</p>
                    <button onClick={() => signIn('discord')} className='bg-refuge-highlight text-white p-3 rounded-lg hover:cursor-pointer hover:animate-pulse text-3xl my-10'>Sign In</button>
                </div>
                <Footer />
            </div>
        )
    }
    else if (status === 'loading') {
        return (
            <div>
                <NavBar />
                <div className='font-main my-32 mx-10 grid place-content-center'>
                    <h1 className='text-5xl text-twm-sun text-center'>Profile</h1>
                    <p className='text-xl mt-5 text-center'>Logging In...</p>
                </div>
                <Footer />
            </div>
        )
    }

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

    if (pageStatus === 'loading') {
      return (
            <div>
                <NavBar />
                <div className='font-main my-32 mx-10 grid place-content-center'>
                    <h1 className='text-5xl text-twm-sun text-center'>Profile</h1>
                    <p className='text-xl mt-5 text-center'>Fetching Profile Data...</p>
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
}