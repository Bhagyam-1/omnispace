import React from 'react';
import FriendCard from '../_components/friends/friend-card';
import { FriendI } from '../_utils/types';
import NoFriend from '../_components/friends/no-friend';

const FriendsPage = () => {
    const friends: FriendI[] = [
        {
            id: 1,
            name: "John Doe",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 2,
            name: "Cristina Doe",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 3,
            name: "Neuster Doe",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
            id: 4,
            name: "Creator Doe",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        }
    ];

    return (
        <section className="py-16 sm:px-12 w-full">
            {
                friends.length > 0 ?
                    (
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(330px,_1fr))] gap-2 sm:gap-8">
                            {
                                friends.map((friend: FriendI) => (
                                    <FriendCard key={friend.id} friend={friend} />
                                ))
                            }
                        </div> 
                    ) :
                    <NoFriend />
            }
        </section>
    )
}

export default FriendsPage;