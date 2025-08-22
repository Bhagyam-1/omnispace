import { UserRoundX } from 'lucide-react';
import React from 'react';

const NoFriendRequest = () => {
    return (
        <div className='flex items-center justify-center h-full'>
            <div className="flex justify-center items-center w-fit h-fit mx-auto">
                <div className="flex flex-col gap-4 justify-center items-center w-fit p-8 rounded-lg">
                    <UserRoundX className="w-16 h-16 text-muted-foreground" />
                    <div className="flex flex-col gap-4 text-center">
                        <h2 className="text-muted-foreground text-2xl">No friend requests found</h2>
                        <p className="text-muted-foreground text-lg italic">(No problem, instead you can start making new friends by searching for users)</p>
                    </div>
                </div>
                {/* <CardFooter className="w-full">
                    <Button variant="ghost" asChild className='w-full text-primary hover:text-primary/80 text-lg'>
                        <Link href="/connect/search">Search users</Link>
                    </Button>
                </CardFooter> */}
            </div>
        </div>
    )
}

export default NoFriendRequest;