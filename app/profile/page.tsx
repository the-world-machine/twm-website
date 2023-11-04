'use client'
import NavBar from "../components/NavBar/nav-bar";
import Footer from "../components/footer";
import { ParseType, UserData, Background } from "../components/database-parse-type";
import {useSession, signIn} from "next-auth/react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
export default function Profile() {

    const [hasBeenCalled, setBeenCalled] = useState(false);
    const [pageStatus, setPageStatus] = useState('loading');
    const [userData, setUserData] = useState<null | UserData>(null);

    function Page(user: UserData) {

      let profileDescription: string = user.profile_description;

      return(
        <div>
            <NavBar />
            <div className='font-main my-32 mx-10 grid place-content-center'>
                <h1 className='text-5xl text-twm-sun text-center'>Profile</h1>
                <p className='text-xl mt-5 text-center'>Welcome</p>
                <label htmlFor="description">Update profile description</label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={user.profile_description}
                  onChange={(e) => profileDescription = e.target.value}
                  className="text-black bg-twm-highlight p-2 rounded-lg"
                />
                <button onClick={() => UpdateProfileDescription(profileDescription, String(user.p_key))} type="submit">Submit</button>
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

    const UpdateProfileDescription = useCallback((description: string, userID: string) => {

      async function updateData() {

        console.log(description);

        try {
          const response = await fetch('/api/db/update', {
            method: 'POST',
            headers: {
              table: 'user_data',
              p_key: userID,
              column: 'profile_description',
              data: description
            }
          })

          if (response.headers.get('data') === 'error') {

            console.error('Error fetching data.')

            window.location.reload();
          }
          
          window.location.reload();

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      updateData();
    }, [])

    const getUserData = useCallback((userID: string) => {

      async function fetchData() {
        try {
          const response = await fetch('/api/db/get', {
            method: 'POST',
            headers: {
              table: 'user_data',
              p_key: userID,
            }
          })

          if (response.headers.get('data') === 'error') {

            console.error('Error fetching data.')

            setPageStatus('error');
          }
          
          const user: UserData = JSON.parse(response.headers.get('data') as string);

          user.p_key = userID;

          setUserData(user);
          setPageStatus('success');

        } catch (error) {
          console.error('Error fetching data:', error);
          setPageStatus('error');
        }
      }
  
      return fetchData();
    }, []);

    const { data, status } = useSession();

    if (!data && status !== 'loading') {
        return (
            <div>
                <NavBar />
                <div className='font-main my-32 mx-10 grid place-content-center'>
                    <h1 className='text-5xl text-twm-sun text-center'>Profile</h1>
                    <p   className='text-xl mt-5 text-center'>You need to be signed in to access this page!</p>
                    <button onClick={() => signIn('discord')} className='bg-twm-highlight text-white p-3 rounded-lg hover:cursor-pointer hover:animate-pulse text-3xl my-10'>Sign In</button>
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