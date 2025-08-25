export const dynamic = "force-dynamic";

import React from 'react';
import NoFriend from '../_components/friends/no-friend';
import { getFriends } from '@/actions/omniconnect/connections/connections';
import Friends from '../_components/friends/friends';
import { FriendI } from '../_utils/types';

const FriendsPage = async() => {
    let friends: FriendI[] = [];
    try {
        friends = await getFriends(1, 10, "");
    } catch (error) {
        console.log(error);
    }

    return (
        <section className="w-full h-full">
            {
                friends.length > 0 ? (
                    <Friends allFriends={friends} />
                ) : (
                    <NoFriend />
                )
            }
        </section>
    )
}

export default FriendsPage;
