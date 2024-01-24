'use client'
import NavBar from "../components/NavBar/nav-bar";
import Footer from "../components/footer";
import { UserData, Background } from "../components/database-parse-type";
import {useSession, signIn} from "next-auth/react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import BackgroundSelection from "../components/profile/background-selector";
import languages from './languages.json';
import { signOut } from "next-auth/react";
import { Fetch, GetBackgrounds, Update } from "../database";
import Desktop from '../page';
import Window from '../components/window';

export default function Profile() {

    // initialization
    const [hasBeenCalled, setBeenCalled] = useState(false);
    
    const [pageStatus, setPageStatus] = useState('loading');
    const [userData, setUserData] = useState<null | UserData>(null);

    // backgrounds
    const [equippedBackground, setEquippedBackground] = useState<string>('Default');
    const [ownedBackgrounds, setBackgrounds] = useState<string[]>([]);

    const [allBackgrounds, setAllBackgrounds] = useState<Background[]>([]);

    // saving changes
    const [saveStatus, setSaveStatus] = useState('...');
    const [saved, setSaved] = useState(true);

    const [textLength, setTextLength] = useState(0);
    const [profileDescription, setProfileDescription] = useState('');

    const [translationLanguage, setTranslationLanguage] = useState('english');
     
    const [badgeNotifications, setBadgeNotifications] = useState(true);

    const { data, status } = useSession();

    function LoadingPage(status: string) {

      if (status === 'loading') {
        return (
          <Desktop>
            <Window title='Profile' className="">
              <div className="text-xl text-black">Authenticating...</div>
            </Window>  
          </Desktop>
        )
      } else if (status === 'error') {
        return (
          <Desktop>
            <Window title='Error!' className="">
              <div className="text-xl text-black">An error has occurred. Please try again later.</div>
            </Window>  
          </Desktop>
        )
      } else if (status === 'unauthenticated') {
        return (
          <Desktop>
            <Window title='Error!' className="grid justify-center items-center">
              <div className="text-xl text-black text-center">You need to be signed in to Discord to access this page!</div>
              <div className="mx-auto mt-5 scale-120">
                <button onClick={() => signIn('discord')}>Sign In</button> <button onClick={() => window.location.href = '/'}>Okay</button>
              </div>
            </Window>  
          </Desktop>
        )
      }
    }

    function Page(user: UserData) {

      const updateProfileDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        
        setProfileDescription(e.target.value);

        setTextLength(e.target.value.length);

        console.log(profileDescription);

        setSaved(false);
        setSaveStatus('You have unsaved changes!');

      }

      const updateBackground = (background: string) => {
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

      const updateBadgeNotifications = (e: any) => {
        setBadgeNotifications(e.target.checked);

        setSaved(false);
        setSaveStatus('You have unsaved changes!');
      }

      const SaveChanges = () => {

        if (saved) {
          return;
        }

        let description = profileDescription;

        console.log(description)

        UpdateDatabase('profile_description', description, String(user.p_key));
        UpdateDatabase('equipped_bg', equippedBackground, String(user.p_key));
        UpdateDatabase('translation_language', translationLanguage, String(user.p_key));
        UpdateDatabase('badge_notifications', String(badgeNotifications), String(user.p_key));

        setSaved(true);
        setSaveStatus('Changes have been saved!');
      }

      return(
        <Desktop>
          <Window title='Profile' className="max-w-[500px]">
              <div className='window w-full sticky top-0 bg-opacity-100'>
                <div className="font-main flex justify-center">
                    <p className='text-xl text-center text-black mr-6 my-2'>{saveStatus}</p>
                    <button
                      onClick={SaveChanges}
                      type="submit"
                      disabled={saved}
                      className={saved ? 'hover:cursor-not-allowed text-xl mb-2 my-2' : 'text-xl mb-2 my-2'}>
                        Save Changes
                    </button>
                </div>
              </div>

              <div className='font-main my-10 mx-10 grid place-content-center'>

                  <h1 className='text-3xl ml-5 text-black text-center'>User Settings</h1>

                  <h1 className='text-xl text-black text-center mt-10 mb-5'>Change Translation Language</h1>

                  <select title='Change the language displayed after translating a message.' onChange={(e) => updateLanguage(e.currentTarget.value)} value={translationLanguage} className="text-black h-6">
                    {languages.map((language) => (
                      <option key={language.value} value={language.value}>{language.name}</option>
                    ))}
                  </select>

                  <h1 className='text-xl text-black text-center mt-10 mb-5 outline-2'>Other Settings</h1>
                  <div className="field-row mx-auto scale-150">
                    <label className='text-black'><input title='Disable or enable badge notifications. If enabled, this will show you when you get a new badge.' type="checkbox" checked={badgeNotifications} onChange={updateBadgeNotifications} /> Badge Notifications</label>
                  </div>

                  <hr className='my-10' />

                  <h1 className='text-3xl mt-2 text-black text-center'>Profile Settings</h1>

                  <h1 className='text-xl text-black text-center mt-5 mb-5'>Change Profile Description</h1>
                  <textarea
                    id="description"
                    name="description"
                    title='Change your profile description. This shows up when you run the /profile <user> command.'
                    defaultValue={user.profile_description}
                    onChange={(e) => updateProfileDescription(e)}
                    maxLength={100}
                    className="field-row resize-none text-black text-lg p-2 mb-2 text-center"
                  />
                  <h1 className='text-black text-sm'>{textLength}/100</h1>

                  <h1 className='text-xl text-black text-center mt-5 mb-5'>Change Profile Background</h1>

                  <BackgroundSelection ownedBackgrounds={ownedBackgrounds} equippedBackground={equippedBackground} allBackgrounds={allBackgrounds} onChange={updateBackground} />
              </div>
          </Window>
        </Desktop>
      )
    }
    
    function ErrorPage() {
      return LoadingPage('error');
    }

    const UpdateDatabase = useCallback((column: string, data: any, userID: string) => {

      async function updateData() {

        try {
          const response = await Update('UserData', column, userID, data)

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

    async function fetchData() {
      try {
        const response = await Fetch('UserData', userID);

        if (response === null) {
          console.error('Error fetching data');
          setPageStatus('error');
          return;
        }

        const backgrounds: any = await GetBackgrounds();

        let all_bgs: any[] = [];

        for (const bg in backgrounds) {
          all_bgs.push({ name: bg, image: backgrounds[bg]['image'] });
        }

        setAllBackgrounds(all_bgs);

        const user: UserData = response[0];
        user.p_key = userID;

        const notifications = JSON.parse(user.badge_notifications as string);

        const unlockedBackgroundIDs = JSON.parse(user.owned_backgrounds as string);

        setBackgrounds(unlockedBackgroundIDs);
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
      return LoadingPage('unauthenticated');
  }
  else if (status === 'loading') {
      return LoadingPage('loading');
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
    return LoadingPage('loading');
  }

  if (pageStatus === 'error') {
    return ErrorPage();
  }

  if (pageStatus === 'success') {
    return Page(userData as UserData);
  }
}