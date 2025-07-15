import React from 'react';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Image from 'next/image';
import FriendMessageCard from '../../_components/messages/friend-message';

const users = [
    {
        id: 1,
        name: "John Doe",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 2,
        name: "Rohn Doe",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 3,
        name: "Loun tro",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 4,
        name: "Jane Smith",
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 5,
        name: "Mike Johnson",
        image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 6,
        name: "Emily Davis",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 7,
        name: "Chris Lee",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 8,
        name: "Sara Wilson",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 9,
        name: "David Martinez",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 10,
        name: "Olivia Brown",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 11,
        name: "Liam Nguyen",
        image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 12,
        name: "Ava Patel",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
        id: 13,
        name: "Ethan Kim",
        image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
]

const FriendsListPage = () => {

    return (
        <div className='flex flex-col gap-4 h-full border-r border-r-secondary md:w-fit pt-8'>
            <Input placeholder='Search' className='mx-4 w-[calc(100%-2rem)] md:w-52 lg:w-72' />
            <nav className='flex-1 max-h-[calc(100vh-10rem)] overflow-y-auto w-full'>
                <ul className='flex flex-col items-start gap-2 w-full'>
                    {
                        users.map((user) => (
                            <FriendMessageCard key={user.id} user={user} />
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default FriendsListPage;