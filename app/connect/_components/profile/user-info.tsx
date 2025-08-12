import React from 'react';
import { UserI } from '../../_utils/types';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import UserStats from './user-stats';
import EditUserProfile from './edit-profile/edit-user-profile';
import { getFriendsLength, getPostsLength, getRequestsLength } from '@/actions/omniconnect/connections/connections';
import SearchedUserStats from './searched-user-stats';

interface UserInfoProps {
    user: UserI;
    isSearchedUser: boolean;
    isFriend: boolean;
}

const UserInfo = async({user, isSearchedUser, isFriend}: UserInfoProps) => {
    const userStats = await Promise.all([
        getPostsLength(user.userName),
        getFriendsLength(user.userName),
        getRequestsLength(user.userName)
    ]);

    return (
        <>
            <div className='lg:px-24 md:px-12 px-0 flex gap-4 sm:gap-12 md:gap-24'>
                <div className='flex flex-col items-center gap-4 shrink-0'>
                    {
                        user.image ? (
                            <img 
                                src={user.image} 
                                alt={user.userName} 
                                className='w-24 h-24 md:w-30 md:h-30 lg:w-44 lg:h-44 object-cover rounded-full'
                            />
                        ) : (
                            <Image
                                src="/profile.jpg"
                                alt="Profile"
                                width={100}
                                height={100}
                                className='w-24 h-24 md:w-30 md:h-30 lg:w-44 lg:h-44 object-cover rounded-full'
                            />
                        )
                    }
                    
                    { !isSearchedUser && <EditUserProfile user={user}/> }
                </div>

                <div className='flex flex-col gap-6 mt-4 sm:mt-2 lg:mt-8'>
                    <h2 className='text-3xl font-semibold pl-4 line-clamp-2 break-all'>{user.userName} ({user.name})</h2>
                    <div className='hidden sm:flex'>
                        {
                            isSearchedUser ? (
                                <SearchedUserStats userStats={userStats} isFriend={isFriend} />
                            ) : (
                                <UserStats userStats={userStats} />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center sm:hidden gap-4 mt-4'>
                <Separator />
                {
                    isSearchedUser ? (
                        <SearchedUserStats userStats={userStats} isFriend={isFriend} />
                    ) : (
                        <UserStats userStats={userStats} />
                    )
                }
            </div>
            <Separator />
        </>
    )
}

export default UserInfo;
