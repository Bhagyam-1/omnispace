"use client";

import React, { useState, useRef } from 'react'
import FriendCard from './friend-card';
import { FriendI } from '../../_utils/types';
import IntersectionTrigger from '@/app/news/_components/news-dashboard/intersection-trigger';
import { getFriends } from '@/actions/omniconnect/connections/connections';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';

const Friends = ({allFriends}: {allFriends: FriendI[]}) => {
    const [friends, setFriends] = useState(allFriends);
    const [page, setPage] = useState(2);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const lastPageFriendsLengthRef = useRef(allFriends.length);

    useDebounce(search, 300, () => {
        setPage(1);
        fetchFriends(1);
    });

    const fetchFriends = async(page: number) => {
        if(lastPageFriendsLengthRef.current < 10) {
            return;
        }
        try {
            setLoading(true);
            const newFriends = await getFriends(page, 10, search);
            setFriends((prev) => [...prev, ...newFriends]);
            lastPageFriendsLengthRef.current = newFriends.length;
            setPage((prev) => prev + 1)
        } catch {
            toast.error("Failed to fetch friends info");
        } finally {
            setLoading(false);
        }
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
                <IntersectionTrigger onIntersect={() => fetchFriends(page)} />
                {
                    loading && (
                        <Loader className="animate-spin" />
                    )
                }
            </div>
        </div>
    )
}

export default Friends;