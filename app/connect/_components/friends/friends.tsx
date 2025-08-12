"use client";

import React, { useEffect, useState } from 'react'
import FriendCard from './friend-card';
import { FriendI } from '../../_utils/types';
import IntersectionTrigger from '@/app/news/_components/news-dashboard/intersection-trigger';
import { getFriends } from '@/actions/omniconnect/connections/connections';
import { Input } from '@/components/ui/input';

const Friends = ({allFriends}: {allFriends: FriendI[]}) => {
    const [friends, setFriends] = useState(allFriends);
    const [lastPageFriendsLength, setLastPageFriendsLength] = useState(allFriends.length);
    const [page, setPage] = useState(2);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchFriends = async() => {
            const newFriends = await getFriends(page, 10, search);
            setFriends((prev) => [...prev, ...newFriends]);
            setLastPageFriendsLength(newFriends.length);
        }
        fetchFriends();
    }, [page, search]);

    const fetchFriends = () => {
        if(lastPageFriendsLength < 10) {
            return;
        }
        setPage((prev) => prev + 1)
    }

    const handleSearch = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setPage(1);
        setSearch(searchValue);
    }

    const removeFriend = (friendIndex: number) => {
        setFriends((prev) => prev.filter((_, currIndex) => currIndex !== friendIndex));
    }

    return (
        <div className="space-y-8 pb-4 px-4 sm:pl-8 sm:pr-0 pt-12">
            <Input placeholder="Search friends" className="w-full xs:w-1/2 p-5" onChange={handleSearch} />
            <div className="sm:pr-8 py-4 max-h-[calc(100vh-14rem)] overflow-y-auto">
                <ul className="grid grid-cols-1 xs:grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(335px,_1fr))] gap-4 sm:gap-8">
                    {
                        friends.map((friend: FriendI, friendIndex: number) => (
                            <FriendCard key={friend.id} friend={friend} removeUser={() => removeFriend(friendIndex)} />
                        ))
                    }
                </ul>
                <IntersectionTrigger onIntersect={fetchFriends} />
            </div>
        </div>
    )
}

export default Friends;