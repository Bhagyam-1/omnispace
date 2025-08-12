import React from 'react';
import FriendParallelChatPage from '../@chat/[id]/page';

const FriendChatPage = async ({params}: {params: Promise<{id: string}>}) => {
    const friendParams = await params;
    const friendId = friendParams.id;
    console.log(friendId);
    
    return (
        <div className='h-full w-full p-4'>
            <FriendParallelChatPage params={params} />
        </div>
    )
}

export default FriendChatPage;