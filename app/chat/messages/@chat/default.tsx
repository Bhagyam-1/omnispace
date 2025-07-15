import { MessageCircle } from 'lucide-react'
import React from 'react'

const ChatDefault = () => {
    return (
        <div className='flex flex-col w-full items-center justify-center gap-4 h-full p-4 md:p-8 rounded-e-lg'>
            <MessageCircle className='w-16 h-16 text-primary' />
            <h2 className='text-primary text-2xl font-semibold text-center'>Start a conversation</h2>
            <p className='text-primary text-sm text-center'>Send a message to start a conversation</p>
        </div>
    )
}

export default ChatDefault;