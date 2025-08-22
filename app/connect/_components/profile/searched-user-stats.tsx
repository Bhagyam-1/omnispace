import React from 'react';
import { Button } from '@/components/ui/button';

interface SearchedUserStatsProps {
    userStats: number[];
}

const SearchedUserStats = ({userStats}: SearchedUserStatsProps) => {
    const stats = [
        { label: "Posts", count: userStats[0] },
        { label: "Friends", count: userStats[1] },
        { label: "Requests", count: userStats[2] }
    ]
    
    return (
        <div className='flex gap-2'>
            {
                stats.map((stat) => (
                    <Button 
                        key={stat.label}
                        variant="ghost" 
                        className='text-md sm:text-lg text-muted-foreground cursor-pointer w-fit'
                    >
                        {stat.count} {stat.label}
                    </Button>
                ))
            }
        </div>
    )
}

export default SearchedUserStats
