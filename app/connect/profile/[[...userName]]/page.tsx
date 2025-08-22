import React from 'react';
import { getLoggedInUser, getUserByUserName } from '@/actions/omniconnect/users/users';
import UserInfo from '../../_components/profile/user-info';
import ProfileTabs from '../../_components/profile/profile-tabs/profile-tabs';
import Link from 'next/link';
import { toast } from 'sonner';

const ProfilePage = async({params}: {params: Promise<{userName: string}>}) => {
    const allParams = await params;
    const userName = allParams.userName;

    let user, isSearchedUser = false, isFriend = false;

    if(!userName) {
        try {
            user = await getLoggedInUser();
        } catch (err) {
            if(err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to fetch user");
            }
        }
    } else {
        try {
            const searchedUser = await getUserByUserName(userName);
            user = searchedUser.user;
            isSearchedUser = !searchedUser.isLoggedInUser;
            isFriend = searchedUser?.isFriend;
        } catch (err) {
            if(err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to fetch user");
            }
        }
    }
    
    return (
        <section className="m-auto p-8">
            {
                user ? (
                    <div className='flex flex-col sm:gap-8 gap-4'>
                        <UserInfo user={user} isSearchedUser={isSearchedUser} />
                        {
                            (!isSearchedUser || isFriend) ? (
                                <ProfileTabs userName={userName} isSearchedUser={isSearchedUser} />
                            ) : 
                            (
                                <h3 className='text-center text-2xl text-muted-foreground mt-16'>
                                    You are not friends with this user
                                    <p>
                                        Add as friend to view profile
                                    </p>
                                </h3>
                            )
                        }
                    </div>
                ) : (
                    <p className='flex flex-col items-center justify-center gap-2 h-[calc(100vh-12rem)] text-center text-2xl text-muted-foreground'>
                        User not found
                        <span className='text-primary'>
                            Please return back to 
                            <Link href="/connect" className='pl-2 text-secondary-foreground hover:underline'>Home</Link>
                        </span>
                    </p>
                )
            }
        </section>
    )
}

export default ProfilePage;