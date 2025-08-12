import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { FrownIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NoFriendRequest = () => {
    return (
        <div className='flex items-center justify-center h-full'>
            <Card className="flex justify-center items-center w-fit h-fit mx-auto">
                <CardContent className="flex flex-col gap-4 justify-center items-center w-fit p-8 rounded-lg">
                    <FrownIcon className="w-16 h-16 text-primary" />
                    <div className="flex flex-col gap-2 text-center">
                        <h2 className="text-primary text-2xl">No friend requests found</h2>
                        <p className="text-primary">No problem, instead you can start making new friends by searching for users</p>
                    </div>
                </CardContent>
                <CardFooter className="w-full">
                    <Button variant="outline" asChild className='w-full'>
                        <Link href="/connect/search">Search users</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default NoFriendRequest;