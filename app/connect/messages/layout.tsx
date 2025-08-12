import React from 'react'

const MessagesLayout = async(
    {children, list, chat}: 
    {children: React.ReactNode, list: React.ReactNode, chat: React.ReactNode}
) => {

    return (
        <section className='flex h-full w-full rounded-lg'>
            <div className="hidden md:block rounded-s-lg">
                {list}
            </div>
            <div className="hidden md:flex flex-1 rounded-e-lg">
                {chat}
            </div>
            <div className="block md:hidden w-full">
                {children}
            </div>
        </section>
    )
}

export default MessagesLayout;