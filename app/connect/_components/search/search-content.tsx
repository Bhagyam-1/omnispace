"use client";

import React, { useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input';
import { getNotConnectedUsers } from '@/actions/omniconnect/users/users';
import { UserI } from '../../_utils/types';
import { useState } from 'react';
import IntersectionTrigger from '@/app/news/_components/news-dashboard/intersection-trigger';
import SearchedUsers from './searched-users';
import NoUser from './no-user';
import { toast } from 'sonner';
import SearchLoading from './search-loading';

const SearchContent = () => {
    const [users, setUsers] = useState<UserI[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const lastPageUsersLengthRef = useRef(0);

    useEffect(() => {
        let ignore = false;

        const fetchUsers = async () => {
            try {
                setLoading(true);
                const newUsers = await getNotConnectedUsers(page, 10, search);

                if (!ignore) {
                    if (page === 1) {
                        setUsers(newUsers);
                    } else {
                        setUsers(prev => [...prev, ...newUsers]);
                    }
                    lastPageUsersLengthRef.current = newUsers.length; // ref instead of state
                    setLoading(false);
                }
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Failed to fetch users");
                setLoading(false);
            }
        };

        if (page === 1 || lastPageUsersLengthRef.current === 10) {
            fetchUsers();
        }

        return () => {
            ignore = true; // prevents setting state on unmounted effect
        };
    }, [page, search]);

    const fetchUsers = () => {
        if(lastPageUsersLengthRef.current < 10) {
            return;
        }
        setPage((prev) => prev + 1)
    }

    const handleSearch = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setPage(1);
        setSearch(searchValue);
    }

    const removeUser = (userIndex: number) => {
        setUsers((prev) => prev.filter((_, currIndex) => currIndex !== userIndex));
    }

    if(loading) {
        return <SearchLoading />
    }

    return (
        <div className='w-full h-full flex flex-col gap-4 items-center'>
            <div className="mt-8 w-full">
                <Input placeholder='Search for users' className='w-full rounded-full p-5' onChange={handleSearch} />
            </div>
            {
                users.length > 0 ? (
                    <ul className='w-full max-h-[calc(100vh-16rem)] md:max-h-[calc(100vh-18rem)] overflow-y-auto gap-4'>
                        <SearchedUsers users={users} removeUser={removeUser} />
                        <IntersectionTrigger onIntersect={fetchUsers} />
                    </ul>
                ) : (
                    <NoUser />
                )
            }
        </div>
    )
}

export default SearchContent;
