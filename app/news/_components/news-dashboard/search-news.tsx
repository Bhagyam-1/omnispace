"use client";

import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce';

const SearchNews = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');

    useDebounce(search, 300, () => {
        router.push(`/news?search=${search}`);
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    
  return (
      <Input type="text" placeholder="Search news..." className="w-1/2 rounded-lg" onChange={handleInputChange} />
  )
}

export default SearchNews;