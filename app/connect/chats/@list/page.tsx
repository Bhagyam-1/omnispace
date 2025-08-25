import React from 'react';
import FriendList from '../../_components/chats/friend-list';
import { getRoomsList } from '@/actions/omniconnect/room/room';

const FriendsListPage = async() => {
    const rooms = await getRoomsList(1, 10, "");
    
    return (
        rooms?.length > 0 ? <FriendList initialRooms={rooms} /> : <></>
    )
}

export default FriendsListPage;