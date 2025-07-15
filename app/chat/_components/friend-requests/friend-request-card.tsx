import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CircleCheck, CircleX } from 'lucide-react'
import { FriendRequestI } from '../../_utils/types';

const FriendRequestCard = ({request}: {request: FriendRequestI}) => {
    return (
        <Card className='w-full h-fit bg-transparent sm:bg-card'>
            <CardContent className='flex flex-col'>
                <div className='flex gap-4 items-center'>
                    <img src={request.image} alt={request.name} className='w-16 h-16 rounded-full' />
                    <h2>{request.name}</h2>
                </div>
            </CardContent>
            <CardFooter className='flex gap-4 justify-end'>
                <Button size="lg" variant="outline" 
                    className='flex gap-2 justify-end self-end cursor-pointer text-green-500 hover:text-green-600'
                >
                    <span className='hidden sm:inline'>Accept</span>
                    <CircleCheck className='w-4 h-4' />
                </Button>

                <Button size="lg" variant="outline" 
                    className='flex gap-2 justify-end self-end cursor-pointer text-red-500 hover:text-red-600'
                >
                    <span className='hidden sm:inline'>Reject</span>
                    <CircleX className='w-4 h-4' />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default FriendRequestCard;