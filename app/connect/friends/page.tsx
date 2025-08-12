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


// const friends: FriendI[] = [
//     {
//         id: 1,
//         name: "John Doe",
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//         id: 2,
//         name: "Cristina Doe",
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//         id: 3,
//         name: "Neuster Doe",
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//         id: 4,
//         name: "Creator Doe",
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//         id: 5,
//         name: "John Doe",
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//         id: 6,
//         name: "Cristina Doe",
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//         id: 7,
//         name: "Neuster Doe",
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//     {
//         id: 8,
//         name: "Creator Doe",
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     }
// ];
