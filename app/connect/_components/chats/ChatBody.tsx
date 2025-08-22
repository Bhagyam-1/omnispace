"use client";

import { useEffect, useState } from "react";
import { IFormattedMessage } from "../../_utils/types";
import { getSocket } from "../../_utils/socket";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";

interface ChatBodyProps {
    roomId: string;
    initialMessages: IFormattedMessage[];
}

const ChatBody = ({roomId, initialMessages}: ChatBodyProps) => {
    const [chats, setChats] = useState<IFormattedMessage[]>(initialMessages);

    useEffect(() => {
        let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

        const fetchMessages = async() => {
            const res = await fetch(`/api/connect/room/${roomId}/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const {token, userId} = await res.json();
            
            socket = getSocket(token);
            socket.emit("join_room", {roomId});

            socket.on("message", (data) => {
                const newMessage = {
                    ...data,
                    isFriend: data.sender.id === userId
                }
                console.log(newMessage);
                setChats((prevChats) => [...prevChats, newMessage]);
            });
        }

        fetchMessages();

        return () => {
            socket.disconnect();
        }
    }, [roomId]);

    return (
        <div className='flex flex-col flex-1 max-h-[calc(100vh-16rem)] md:max-h-[calc(100vh-18rem)] overflow-y-auto p-2 gap-4'>
                    {
                        chats?.length > 0 ? (
                            chats.map((chat) => (
                                <div 
                                    key={chat.id} 
                                    className={`w-full max-w-2/5 lg:max-w-1/3 mb-4 p-4 rounded-lg ${
                                        chat.isFriend 
                                        ? 'self-end bg-primary text-primary-foreground' 
                                        : 'self-start bg-muted'
                                    }`}
                                >
                                    <p className="text-sm w-fit break-words">{chat.message}</p>
                                    {/* {chat.senderName && (
                                        <p className="text-xs mt-1 opacity-70">
                                            {chat.senderName}
                                        </p>
                                    )} */}
                                </div>
                        ))
                        ) : (
                            <div className='flex flex-col flex-1 items-center justify-center px-2 md:px-4'>
                                <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                            </div>
                        )
                    }
                </div>
    )
}

export default ChatBody;