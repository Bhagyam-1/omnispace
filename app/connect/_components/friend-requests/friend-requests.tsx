"use client";

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import FriendRequestCard from './friend-request-card';
import { getFriendRequests } from '@/actions/omniconnect/connections/connections';
import IntersectionTrigger from '@/app/news/_components/news-dashboard/intersection-trigger';

const FriendRequests = ({initialRequests}: {initialRequests: any[]}) => {
    const [requests, setRequests] = useState(initialRequests);
    const [lastPageRequestsLength, setLastPageRequestsLength] = useState(initialRequests.length);
    const [page, setPage] = useState(2);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchRequests = async() => {
            const newRequests = await getFriendRequests(page, 10, search);
            setRequests((prev) => [...prev, ...newRequests]);
            setLastPageRequestsLength(newRequests.length);
        }
        fetchRequests();
    }, [page, search]);

    const fetchRequests = () => {
        if(lastPageRequestsLength < 10) {
            return;
        }
        setPage((prev) => prev + 1)
    }

    const handleSearch = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setPage(1);
        setSearch(searchValue);
    }

    const removeRequest = (requestIndex: number) => {
        setRequests((prev) => prev.filter((_, currIndex) => currIndex !== requestIndex));
    }

    return (
        <div className='pt-12 pb-4 px-4 sm:pl-8 sm:pr-0 space-y-8'>
            <Input placeholder="Search requests" className="w-full sm:w-1/2 p-5" onChange={handleSearch}/>
            <div className="sm:pr-8 py-4 max-h-[calc(100vh-14rem)] overflow-y-auto">
                <ul className="grid grid-cols-1 xs:grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))] gap-4 sm:gap-8">
                    {
                        requests.map((request: any) => 
                            <FriendRequestCard key={request.id} 
                                request={request} 
                                removeUser={() => removeRequest(request.id)}
                            />
                        )
                    }
                </ul>
                <IntersectionTrigger onIntersect={fetchRequests} />
            </div>
        </div>
    )
}

export default FriendRequests;