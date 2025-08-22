"use client"

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { RoomI } from '@/app/connect/_utils/types';
import Image from 'next/image';
import { setChatRoomInfo } from '../../_services/storage.service';

interface FriendChatCardProps {
    roomInfo: RoomI;
}

const FriendChatCard = ({roomInfo}: FriendChatCardProps) => {
  const { id } = useParams();
  const router = useRouter();

  const handleFriendChatRouteLoad = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    setChatRoomInfo(roomInfo);
    router.push(`/connect/chats/${roomInfo.id}`);
  }

  return (    
    <li key={roomInfo.id} value={roomInfo.name} className={`py-2 px-4 w-full hover:bg-muted ${id === String(roomInfo.id) ? 'bg-muted' : ''}`}>
      <Link 
        href={`/connect/chats/${roomInfo.id}`} 
        className="flex justify-start items-center gap-4 cursor-pointer"
        onClick={handleFriendChatRouteLoad}
      >
          <Image src={roomInfo.roomImage || ""} alt={roomInfo.name} className="w-14 h-14 rounded-full" width={50} height={50} />
          <h2 className="text-md font-semibold md:max-w-36 truncate">{roomInfo.name}</h2>
      </Link>
    </li>
  )
}

export default FriendChatCard;