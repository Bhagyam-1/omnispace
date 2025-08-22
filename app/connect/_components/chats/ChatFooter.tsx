"use client";

import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSocket } from "../../_utils/socket"
import { useRef } from "react"

const ChatFooter = () => {

    const messageRef = useRef<HTMLInputElement>(null);

    const sendMessage = () => {
        const socket = getSocket();
        
        socket.emit("message", {
            message: messageRef.current?.value || ""
        });

        if(messageRef.current) {
            messageRef.current.value = "";
        }
    }
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };
    
    return (
        <div className="flex items-center gap-2 px-2 md:px-4 py-1">
            <Input
                ref={messageRef} 
                placeholder="Type your message..." 
                className="w-full h-12"
                onKeyDown={handleKeyDown}
            />
            <Button variant="link" onClick={sendMessage} className="rounded-full cursor-pointer bg-secondary-foreground/80 hover:bg-secondary-foreground">
                <Send className="w-6 h-6" />
            </Button>
        </div>
    )
}

export default ChatFooter;