import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProfileTabLoader = () => {
    return (
        Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className='h-48 xs:h-60 lg:h-72 xl:h-88 w-full rounded-md' />
        ))
    )
}

export default ProfileTabLoader;
