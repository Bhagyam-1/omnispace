import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProfileTabLoader = () => {
    return (
        Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='w-full aspect-[1]'>
                <Skeleton className='h-full rounded-md' />
            </div>
        ))
    )
}

export default ProfileTabLoader;
