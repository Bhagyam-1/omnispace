"use client";

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const SearchNews = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push(`/news?search=${search}`);
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [search, router])
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    
  return (
      <Input type="text" placeholder="Search news..." className="w-1/2" onChange={handleInputChange} />
  )
}

export default SearchNews;