import React from 'react';
import FriendParallelChatPage from '../@chat/[roomId]/page';

const FriendChatPage = async ({params}: {params: Promise<{id: string}>}) => {
    const roomParams = await params;
    const roomId = roomParams.id;
    
    return (
        <div className='h-full w-full p-4'>
            <FriendParallelChatPage params={Promise.resolve({ roomId })} />
        </div>
    )
}

export default FriendChatPage;