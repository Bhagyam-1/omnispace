"use client";

import React, { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import FriendRequestCard from './friend-request-card';
import { getFriendRequests } from '@/actions/omniconnect/connections/connections';
import IntersectionTrigger from '@/app/news/_components/news-dashboard/intersection-trigger';
import useDebounce from '@/hooks/useDebounce';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

const FriendRequests = ({initialRequests}: {initialRequests: any[]}) => {
    const limit = 10;

    const [requests, setRequests] = useState(initialRequests);
    const [page, setPage] = useState(2);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const lastPageRequestsLengthRef = useRef(initialRequests.length);

    useDebounce(search, 300, () => {
        setPage(1);
        fetchRequests(1);
    });

    const fetchRequests = async(page: number) => {
        if(lastPageRequestsLengthRef.current < limit) {
            return;
        }
        try {
            setLoading(true);
            const newRequests = await getFriendRequests(page, limit, search);
            setRequests((prev) => [...prev, ...newRequests]);
            lastPageRequestsLengthRef.current = newRequests.length;
            setPage((prev) => prev + 1);
        } catch {
            toast.error("Failed to fetch requests");
        } finally {
            setLoading(false);
        }
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
                <IntersectionTrigger onIntersect={() => fetchRequests(page)} />
                {
                    loading && (
                        <Loader className="animate-spin" />
                    )
                }
            </div>
        </div>
    )
}

export default FriendRequests;