import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import { MessageCircle, UserMinus } from 'lucide-react';
import { FriendI } from '../../_utils/types';

const FriendCard = ({friend}: {friend: FriendI}) => {
    return (
        <Card key={friend.id} className='w-full h-fit bg-transparent sm:bg-card flex'>
            <CardContent className='flex flex-col'>
                <div className='flex gap-4 items-center'>
                    <img src={friend.image} alt={friend.name} className='w-12 h-12 sm:w-16 sm:h-16 rounded-full' />
                    <h2>{friend.name}</h2>
                </div>
            </CardContent>
            <CardFooter className='flex gap-4 justify-end'>
                <Button asChild size="lg" variant="outline" className='flex gap-2 justify-center self-end cursor-pointer text-secondary-foreground/80 hover:text-secondary-foreground'>
                    <Link href={`/chat/messages/${friend.id}`}>
                        <span className='hidden sm:inline'>Message</span>
                        <MessageCircle />
                    </Link>
                </Button>

                <Button size="lg" variant="outline" className='flex gap-2 justify-center self-end cursor-pointer text-red-500 hover:text-red-600'>
                    <span className='hidden sm:inline'>Remove</span>
                    <UserMinus className='w-4 h-4' />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default FriendCard;



// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import Link from 'next/link';
// import React from 'react';
// import { MessageCircle, UserMinus } from 'lucide-react';
// import { FriendI } from '../../_utils/types';

// const FriendCard = ({friend}: {friend: FriendI}) => {
//     return (
//         <Card key={friend.id} 
//             className='w-full h-fit bg-transparent sm:bg-background border-0 border-b sm:border-1 rounded-none sm:rounded flex'
//         >
//             <CardContent className='flex sm:flex-col justify-between items-center px-0 sm:px-6'>
//                 <div className='flex gap-4 items-center'>
//                     <img src={friend.image} alt={friend.name} className='w-12 h-12 sm:w-16 sm:h-16 rounded-full' />
//                     <h2>{friend.name}</h2>
//                 </div>
//                 <div className='flex gap-4 justify-end hidden sm:flex'>
//                     <Button asChild size="lg" variant="outline" className='flex gap-2 justify-center self-end cursor-pointer text-secondary-foreground/80 hover:text-secondary-foreground'>
//                         <Link href={`/chat/messages/${friend.id}`}>
//                             Message
//                             <MessageCircle />
//                         </Link>
//                     </Button>

//                     <Button size="lg" variant="outline" className='flex gap-2 justify-center self-end cursor-pointer text-red-500 hover:text-red-600'>
//                         Remove
//                         <UserMinus className='w-4 h-4' />
//                     </Button>
//                 </div>

//                 <div className='flex gap-1 justify-end flex sm:hidden'>
//                     <Button asChild size="icon" variant="ghost" className='flex gap-2 justify-center self-end cursor-pointer text-secondary-foreground/80 hover:text-secondary-foreground'>
//                         <Link href={`/chat/messages/${friend.id}`}>
//                             <MessageCircle />
//                         </Link>
//                     </Button>

//                     <Button size="icon" variant="ghost" className='flex gap-2 justify-center self-end cursor-pointer text-red-500 hover:text-red-600'>
//                         <UserMinus className='w-4 h-4' />
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }

// export default FriendCard;