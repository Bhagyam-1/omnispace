import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SearchLoader = ({usersLength = 2}: {usersLength?: number}) => {
  return (
    <div className='w-full h-full flex flex-col gap-4 items-center'>
      <div className="mt-8 w-full">
        <Skeleton className='w-full h-10 rounded-full p-5' />
      </div>
      <ul className='w-full'>
      {
        Array.from({length: usersLength}).map((_, index) => (
            <li key={index} className='flex items-center justify-between w-full p-4'>
                <div className='flex items-center gap-2 w-full'>
                  <Skeleton className='w-12 h-12 rounded-full' />
                  <Skeleton className='w-1/3 h-8' />
                </div>
                <Skeleton className='w-7 h-7 rounded-full' />
            </li>
        ))
      }
      </ul>
    </div>
  )
}

export default SearchLoader;
