import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import { MessageCircle, UserMinus } from 'lucide-react';
import { FriendI } from '../../_utils/types';
import { updateConnection } from '@/actions/omniconnect/connections/connections';
import { toast } from 'sonner';
import Image from 'next/image';

interface FriendCardPropsI {
    friend: FriendI;
    removeUser: () => void;
}

const FriendCard = ({friend, removeUser}: FriendCardPropsI) => {
    const removeFriend = async() => {
        try {
            await updateConnection(friend.connectionId, "removed");
            removeUser();
            toast.success("Friend connection removed");
        } catch (err) {
            if(err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to remove friend connection");
            }
        }
    }
    
    return (
        <li className='w-full h-fit'>
            <Card key={friend.id} className='bg-transparent sm:bg-card flex'>
                <CardContent className='flex flex-col'>
                    <div className='flex gap-4 items-center'>
                        <Image src={friend.image} alt={friend.name} className='w-12 h-12 sm:w-16 sm:h-16 rounded-full' width={50} height={50} />
                        <h2>{friend.name}</h2>
                    </div>
                </CardContent>
                <CardFooter className='flex gap-4 justify-end'>
                    <Button asChild size="lg" variant="outline" 
                        className='flex gap-2 justify-center self-end cursor-pointer text-primary/60 hover:text-primary'
                    >
                        <Link href={`/connect/chats/${friend.id}`}>
                            <span className='hidden xss:block'>Message</span>
                            <MessageCircle />
                        </Link>
                    </Button>

                    <Button size="lg" variant="outline" 
                        className='flex gap-2 justify-center self-end cursor-pointer text-red-500 hover:text-red-600'
                        onClick={removeFriend}
                    >
                        <span className='hidden xss:block'>Remove</span>
                        <UserMinus className='w-4 h-4' />
                    </Button>
                </CardFooter>
            </Card>
        </li>
    )
}

export default FriendCard;