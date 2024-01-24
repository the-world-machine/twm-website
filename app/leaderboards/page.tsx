'use client'
import Desktop from "../page"
import Window from "../components/window"
import icons from './icons.json';
import { useCallback, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { Fetch, GetDiscordData, GetLeaderboard } from "../database";

export interface LeaderboardUser {
    username: string;
    wool: number;
    suns: number;
    times_shattered: number;
    times_asked: number;
    times_transmitted: number;
}

function Title({children} : {children: React.ReactNode}) {
    return(
        <div className="text-3xl text-black text-center">
            {children}
        </div>
    )
}

function Header({children} : {children: React.ReactNode}) {
    return(
        <div className="flex window justify-center text-xl text-black text-center">
            {children}
        </div>
    )
}

function TWMTable({children} : {children: React.ReactNode}) {
    return (
        <div className='flex justify-center'>
            {children}
        </div>
    )
}

function TableColumn({children} : {children: React.ReactNode}) {
    return (
        <div className="grid">
            {children}
        </div>
    )
}

function TableHeader({name} : {name: string}) {
    return (
        <div className="window text-center text-black min-w-[5px]">
            <p className="text-lg mx-2">{name}</p>
        </div>
    )
}

function TableItem({item} : {item: string}) {

    return (
        <div className="flex justify-center bg-white border-2 text-black">
            <p className="text-lg mx-2">{item}</p>
        </div>
    )
}

function LoadingPage(status: string) {

    if (status === 'loading') {
        return (
            <Desktop>
            <Window title='Leaderboards' className="">
                <div className="text-xl text-black">Loading...</div>
            </Window>  
            </Desktop>
        )
    } else if (status === 'authing') {
        return (
          <Desktop>
            <Window title='Leaderboards' className="">
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

function Page(
    user: LeaderboardUser | undefined,
    wool: LeaderboardUser[],
    suns: LeaderboardUser[],
    times_shattered: LeaderboardUser[],
    times_asked: LeaderboardUser[],
    times_transmitted: LeaderboardUser[]
) {
    return (
        <Desktop>
            <Window title="Leaderboards" className="max-w-[700px]">
                <Title>Leaderboard</Title>
                <div className="mt-5"/>
                <Header><p className='text-xl mr-2'>Wool</p> <img src={icons.wool_icon}/></Header>
                <div className="mt-2"/>
                {AssignToLeaderboard('wool', wool)}
                <div className="mt-5"/>
                <Header><p className='text-xl mr-2'>Suns</p> <img src={icons.sun_icon}/></Header>
                <div className="mt-2"/>
                {AssignToLeaderboard('suns', suns)}
                <div className="mt-5"/>
                <Header><p className='text-xl mr-2'>Times Shattered</p> <img src={icons.explode_icon}/></Header>
                <div className="mt-2"/>
                {AssignToLeaderboard('times_shattered', times_shattered)}
                <div className="mt-5"/>
                <Header><p className='text-xl mr-2'>Times Asked</p> <img src={icons.ask_icon}/></Header>
                <div className="mt-2"/>
                {AssignToLeaderboard('times_asked', times_asked)}
                <div className="mt-5"/>
                <Header><p className='text-xl mr-2'>Times Transmitted</p> <img src={icons.transmit_icon}/></Header>
                <div className="mt-2"/>
                {AssignToLeaderboard('times_transmitted', times_transmitted)}
            </Window>
        </Desktop>
    )
}

function AssignToLeaderboard(leaderboard: string, users: LeaderboardUser[]) {

    if (leaderboard === 'wool') {
        if (users.length === 0) {
            return(
                <TWMTable>
                    <TableColumn>
                        <TableHeader name='#'/>
                        <TableItem item='1.'/>
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='User'/>
                        <TableItem item='Loading...'/>
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='Wool'/>
                        <TableItem item='Loading...'/>
                    </TableColumn>
                </TWMTable>
            )
        } else {
            return(
                <TWMTable>
                    <TableColumn>
                        <TableHeader name='#'/>
                        {users.map((user, index) => (
                            <TableItem item={`${index + 1}.`} key={index}/>
                        ))}
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='User'/>
                        {users.map((user, index) => (
                            <TableItem item={user.username} key={index}/>
                        ))}
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='Wool'/>
                        {users.map((user, index) => (
                            <TableItem item={String(user.wool.toLocaleString(undefined))} key={index}/>
                        ))}
                    </TableColumn>
                </TWMTable>
            )
        }
    }

    if (leaderboard ==='suns') {
        if (users.length === 0) {
            return(
                <TWMTable>
                    <TableColumn>
                        <TableHeader name='#'/>
                        <TableItem item='1.'/>
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='User'/>
                        <TableItem item='Loading...'/>
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='Suns'/>
                        <TableItem item='Loading...'/>
                    </TableColumn>
                </TWMTable>
            )
        } else {
            return(
                <TWMTable>
                    <TableColumn>
                        <TableHeader name='#'/>
                        {users.map((user, index) => (
                            <TableItem item={`${index + 1}.`} key={index}/>
                        ))}
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='User'/>
                        {users.map((user, index) => (
                            <TableItem item={user.username} key={index}/>
                        ))}
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='Suns'/>
                        {users.map((user, index) => (
                            <TableItem item={String(user.suns.toLocaleString(undefined))} key={index}/>
                        ))}
                    </TableColumn>
                </TWMTable>
            )
        }
    }

    if (leaderboard === 'times_shattered') {
        if (users.length === 0) {
            return(
                <TWMTable>
                    <TableColumn>
                        <TableHeader name='#'/>
                        <TableItem item='1.'/>
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='User'/>
                        <TableItem item='Loading...'/>
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='Amount'/>
                        <TableItem item='Loading...'/>
                    </TableColumn>
                </TWMTable>
            )
        } else {
            return(
                <TWMTable>
                    <TableColumn>
                        <TableHeader name='#'/>
                        {users.map((user, index) => (
                            <TableItem item={`${index + 1}.`} key={index}/>
                        ))}
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='User'/>
                        {users.map((user, index) => (
                            <TableItem item={user.username} key={index}/>
                        ))}
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='Amount'/>
                        {users.map((user, index) => (
                            <TableItem item={String(user.times_shattered.toLocaleString(undefined))} key={index}/>
                        ))}
                    </TableColumn>
                </TWMTable>
            )
        }
    }

    if (leaderboard === 'times_asked') {
        if (users.length === 0) {
            return(
                <TWMTable>
                    <TableColumn>
                        <TableHeader name='#'/>
                        <TableItem item='1.'/>
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='User'/>
                        <TableItem item='Loading...'/>
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='Amount'/>
                        <TableItem item='Loading...'/>
                    </TableColumn>
                </TWMTable>
            )
        } else {
            return(
                <TWMTable>
                    <TableColumn>
                        <TableHeader name='#'/>
                        {users.map((user, index) => (
                            <TableItem item={`${index + 1}.`} key={index}/>
                        ))}
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='User'/>
                        {users.map((user, index) => (
                            <TableItem item={user.username} key={index}/>
                        ))}
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='Amount'/>
                        {users.map((user, index) => (
                            <TableItem item={String(user.times_asked.toLocaleString(undefined))} key={index}/>
                        ))}
                    </TableColumn>
                </TWMTable>
            )
        }
    }

    if (leaderboard === 'times_transmitted') {
        if (users.length === 0) {
            return(
                <TWMTable>
                    <TableColumn>
                        <TableHeader name='#'/>
                        <TableItem item='1.'/>
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='User'/>
                        <TableItem item='Loading...'/>
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='Amount'/>
                        <TableItem item='Loading...'/>
                    </TableColumn>
                </TWMTable>
            )
        } else {
            return(
                <TWMTable>
                    <TableColumn>
                        <TableHeader name='#'/>
                        {users.map((user, index) => (
                            <TableItem item={`${index + 1}.`} key={index}/>
                        ))}
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='User'/>
                        {users.map((user, index) => (
                            <TableItem item={user.username} key={index}/>
                        ))}
                    </TableColumn>
                    <TableColumn>
                        <TableHeader name='Amount'/>
                        {users.map((user, index) => (
                            <TableItem item={String(user.times_transmitted.toLocaleString(undefined))} key={index}/>
                        ))}
                    </TableColumn>
                </TWMTable>
            )
        }
    }
}

export default function Main() {
    const [pageStatus, setPageStatus] = useState('loading');
    const [gotToken, setGotToken] = useState(false);
  
    const [currentUser, setCurrentUser] = useState<LeaderboardUser | undefined>();
    const [rankedWoolUsers, setRankedWoolUsers] = useState<LeaderboardUser[]>([]);
    const [rankedSunUsers, setRankedSunUsers] = useState<LeaderboardUser[]>([]);
    const [rankedTimesTransmittedUsers, setRankedTimesTransmittedUsers] = useState<LeaderboardUser[]>([]);
    const [rankedTimesAskedUsers, setRankedTimesAskedUsers] = useState<LeaderboardUser[]>([]);
    const [rankedTimesShatteredUsers, setRankedTimesShatteredUsers] = useState<LeaderboardUser[]>([]);
  
    const { data, status } = useSession();
  
    useEffect(() => {
      if (!data && status !== 'loading') {
        setPageStatus('unauthenticated');
      } else if (status === 'loading') {
        setPageStatus('loading');
      } else {
        if (data?.access_token && !gotToken) {
          axios.get('https://discord.com/api/users/@me', {
            headers: {
              Authorization: `Bearer ${data?.access_token}`,
            },
          })
            .then((response) => {
              const discordData = response.data;
  
              setGotToken(true);
  
              setCurrentUser({
                username: discordData.username,
                times_shattered: 0,
                times_asked: 0,
                times_transmitted: 0,
                wool: 0,
                suns: 0,
              });
  
              setPageStatus('success');
            })
            .catch((error) => {
              console.error('Error fetching user data from Discord:', error);
              setPageStatus('error');
            });
        }
      }
    }, [data, status, gotToken]);
  
    useEffect(() => {
        async function grabUserData() {
            try {

            console.log('grabbing wool');

            const allUsers: LeaderboardUser[] = await GetLeaderboard();

            const woolUsers = allUsers.sort((a, b) => b.wool - a.wool).slice(0, 10);
            const sunUsers = allUsers.sort((a, b) => b.suns - a.suns).slice(0, 10);
            const timesShatteredUsers = allUsers.sort((a, b) => b.times_shattered - a.times_shattered).slice(0, 10);
            const timesAskedUsers = allUsers.sort((a, b) => b.times_asked - a.times_asked).slice(0, 10);
            const timesTransmittedUsers = allUsers.sort((a, b) => b.times_transmitted - a.times_transmitted).slice(0, 10);

            setRankedWoolUsers(woolUsers);
            setRankedSunUsers(sunUsers);
            setRankedTimesShatteredUsers(timesShatteredUsers);
            setRankedTimesAskedUsers(timesAskedUsers);
            setRankedTimesTransmittedUsers(timesTransmittedUsers);
            
            setPageStatus('success');
            } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            setPageStatus('error');
            }
        }
  
        grabUserData();
    }, []);
  
    if (pageStatus === 'loading') {
        return LoadingPage('authing');
    }

    if (pageStatus === 'error') {
        return LoadingPage('error');
    }

    if (pageStatus === 'success') {
        return Page(currentUser, rankedWoolUsers, rankedSunUsers, rankedTimesShatteredUsers, rankedTimesAskedUsers, rankedTimesTransmittedUsers);
    }
  }