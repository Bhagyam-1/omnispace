import React from 'react';
import { Input } from '@/components/ui/input';
import { getFriends } from '@/actions/omniconnect/connections/connections';

const FriendParallelChatPage = async ({params}: {params: Promise<{id: string}>}) => {
    const friendParams = await params;
    const friendId = friendParams.id;
    const friends = await getFriends(1, 10, "");
    
    let friend: any = friends.find((friend) => friend.id === Number(friendId));
    friend = {
        name: "John Doe",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    };
    // if (!friend) {
    //     return <div>Friend not found</div>;
    // }

    const messages = [
        {
            id: 1,
            type: "text",
            content: "Hello",
            sender: friendId
        },
        {
            id: 2,
            type: "text",
            content: "How are you?",
            sender: friendId
        },
        {
            id: 3,
            type: "text",
            content: "Hey!",
            sender: 0
        },
        {
            id: 4,
            type: "text",
            content: "I'm good, thanks!",
            sender: 0
        },
        {
            id: 5,
            type: "text",
            content: "What about you? How are you?",
            sender: 0
        },
        {
            id: 6,
            type: "text",
            content: "I'm also good, thanks!",
            sender: friendId
        },
        {
            id: 7,
            type: "text",
            content: "Where are you?",
            sender: friendId
        },
        {
            id: 8,
            type: "text",
            content: "I'm at home",
            sender: 0
        }
    ]

    return (
        <section className="flex flex-col gap-4 h-full w-full">
            <div className="flex gap-2 items-center p-2 md:p-4">
                <img src={friend.image} alt={friend.name} className='h-14 w-14 rounded-full' />
                <h2 className="text-lg font-semibold">{friend.name}</h2>
            </div>
            <div className='flex flex-col gap-8 flex-1 px-2 md:px-4'>
                <div className='flex flex-col flex-1 max-h-[calc(100vh-18rem)] md:max-h-[calc(100vh-20rem)] overflow-y-auto gap-4'>
                {
                    messages.map((message) => (
                        <div key={message.id} className={`w-full max-w-2/5 lg:max-w-1/3 mb-4 p-4 bg-muted rounded-lg ${message.sender === 0 ? 'self-end mr-4' : 'self-start'}`}>
                            <p className="text-sm w-fit break-words">{message.content}</p>
                        </div>
                    ))
                }
                </div>

                <Input type='text' placeholder="Type your message..." className='w-full h-14' />
            </div>
        </section>
    )
}

export default FriendParallelChatPage;