import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CircleCheck, CircleX } from 'lucide-react'
import { FriendRequestI } from '../../_utils/types';
import { updateConnection } from '@/actions/omniconnect/connections/connections';
import { toast } from 'sonner';
import Image from 'next/image';

interface FriendRequestCardPropsI {
    request: FriendRequestI;
    removeUser: () => void;
}

const FriendRequestCard = ({request, removeUser}: FriendRequestCardPropsI) => {
    const acceptFriendRequest = async() => {
        try {
            await updateConnection(request.connectionId, "accepted");
            removeUser();
            toast.success("Friend request accepted");
        } catch (err) {
            if(err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to accept friend request");
            }
        }
    }

    const rejectFriendRequest = async() => {
        try {
            await updateConnection(request.connectionId, "rejected");
            removeUser();
            toast.success("Friend request rejected");
        } catch (err) {
            if(err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to reject friend request");
            }
        }
    }

    const friendRequestActions = [
        {
            label: "Accept",
            onClick: acceptFriendRequest,
            icon: <CircleCheck className="w-4 h-4" />,
            color: "text-green-500 hover:text-green-600",
        },
        {
            label: "Reject",
            onClick: rejectFriendRequest,
            icon: <CircleX className="w-4 h-4" />,
            color: "text-red-500 hover:text-red-600",
        },
    ];

    return (
        <li className='w-full h-fit'>
            <Card className='bg-transparent sm:bg-card'>
                <CardContent className='flex flex-col'>
                    <div className='flex gap-4 items-center'>
                        <Image
                            src={request.image}
                            alt={request.userName}
                            className='w-16 h-16 rounded-full'
                            width={64}
                            height={64}
                        />
                        <h2>{request.userName}</h2>
                    </div>
                </CardContent>
                <CardFooter className='flex gap-4 justify-end'>
                {
                    friendRequestActions.map((action) => (
                        <Button
                            key={action.label}
                            size="lg"
                            variant="outline"
                            className={`flex gap-2 justify-end self-end cursor-pointer ${action.color}`}
                            onClick={action.onClick}
                        >
                            <span className="hidden xss:block">{action.label}</span>
                            {action.icon}
                        </Button>
                    ))
                }
                </CardFooter>
            </Card>
        </li>
    )
}

export default FriendRequestCard;