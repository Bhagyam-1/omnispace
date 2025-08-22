import React from 'react';
import ChatHeader from '@/app/connect/_components/chats/ChatHeader';
import { getChats } from '@/actions/omniconnect/chat/chat';
import ChatFooter from '@/app/connect/_components/chats/ChatFooter';
import ChatBody from '@/app/connect/_components/chats/ChatBody';

interface ChatPageProps {
    params: Promise<{ roomId: string }>;
}

const FriendParallelChatPage = async ({ params }: ChatPageProps) => {
    const roomParams = await params;
    
    if(!roomParams || !roomParams.roomId) return null;

    const roomId = roomParams.roomId;
    
    const messages = await getChats(roomId, 1, 20); // Get first 20 messages
    
    return (
        <section className="flex flex-col gap-4 h-full w-full">
            <ChatHeader />
            <div className='flex flex-col gap-8 flex-1 px-2 md:px-4'>
                <ChatBody roomId={roomId} initialMessages={messages || []} />
                <ChatFooter />
            </div>
        </section>
    );
};

export default FriendParallelChatPage;