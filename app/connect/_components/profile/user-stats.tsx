import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface UserStatsProps {
    userStats: number[];
}

const UserStats = async({userStats}: UserStatsProps) => {
    const stats = [
        { label: "Posts", count: userStats[0], link: "/connect/profile/#posts" },
        { label: "Friends", count: userStats[1], link: "/connect/friends" },
        { label: "Requests", count: userStats[2], link: "/connect/requests" }
    ]
    
    return (
        <div className='flex gap-2'>
            {
                stats.map((stat) => (
                    <Button 
                        key={stat.label}
                        asChild 
                        variant="ghost" 
                        className='text-md sm:text-lg text-muted-foreground cursor-pointer w-fit'
                    >
                        
                        <Link href={stat.link}>
                            {stat.count} {stat.label}
                        </Link>
                    </Button>
                ))
            }
        </div>
    )
}

export default UserStats;