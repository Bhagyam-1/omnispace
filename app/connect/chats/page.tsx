import React from 'react'
import FriendsListPage from './@list/page';

const MessagesPage = async ({params}: {params: Promise<{id: string}>}) => {
    return (
        <FriendsListPage />
    )
}

export default MessagesPage
