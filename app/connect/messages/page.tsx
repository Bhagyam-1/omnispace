import React from 'react'
import FriendsListPage from './@list/page';

const MessagesPage = async ({params}: {params: Promise<{id: string}>}) => {
    const paramsData = await params;
    const id = paramsData.id;
    console.log(id);
    
    return (
        <FriendsListPage />
    )
}

export default MessagesPage
