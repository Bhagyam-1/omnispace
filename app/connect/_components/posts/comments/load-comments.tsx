import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const LoadComments = () => {
  return (
    <div className='flex flex-col gap-4 pt-12 px-2'>
        {
            Array.from({length: 5}).map((_, index) => (
                <div key={index} className='flex items-start gap-4 mb-2'>
                    <div className='flex items-center gap-2'>
                        <Skeleton className='w-10 h-10 rounded-full bg-secondary'/>
                        <Skeleton className='w-32 h-7 bg-secondary'/>
                    </div>
                    {
                        index % 2 === 0 ? 
                        <Skeleton className='w-64 h-14 bg-secondary mt-[5px]'/>
                        : <Skeleton className='w-64 h-7 bg-secondary mt-[5px]'/>
                    }
                </div>
            ))
        }
    </div>
  )
}

export default LoadComments;
