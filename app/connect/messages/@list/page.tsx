export const dynamic = "force-dynamic";

import React from 'react';
import { Input } from '@/components/ui/input';
import FriendMessageCard from '../../_components/messages/friend-message';
import { getFriends } from '@/actions/omniconnect/connections/connections';

const FriendsListPage = async() => {
    const friends = await getFriends(1, 10, "");

    return (
        <div className='flex flex-col flex-1 gap-4 h-full border-r border-r-secondary md:w-fit pt-8'>
            {
                friends.length > 0 ? (
                    <>
                        <Input placeholder='Search' className='mx-4 w-[calc(100%-2rem)] lg:min-w-72 md:min-w-52' />
                        <nav className='flex-1 max-h-[calc(100vh-10rem)] overflow-y-auto w-full mt-4'>
                            <ul className='flex flex-col justify-center md:justify-start gap-2 w-full'>
                                {
                                    friends.map((friend) => (
                                        <FriendMessageCard key={friend.id} user={friend} />
                                    ))
                                }
                            </ul>
                        </nav>
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default FriendsListPage;