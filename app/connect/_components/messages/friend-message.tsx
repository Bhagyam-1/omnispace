"use client"

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const FriendMessageCard = ({user}: {user: {id: number, name: string, image: string}}) => {
  const { id } = useParams();

  return (    
    <li key={user.id} value={user.name} className={`py-2 px-4 w-full hover:bg-muted ${id === String(user.id) ? 'bg-muted' : ''}`}>
      <Link href={`/connect/messages/${user.id}`} className="flex justify-start items-center gap-4 cursor-pointer">
          <img src={user.image} alt={user.name} className="w-14 h-14 rounded-full" />
          <h2 className="text-md font-semibold md:max-w-36 truncate">{user.name}</h2>
      </Link>
    </li>
  )
}

export default FriendMessageCard;