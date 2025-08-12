export const dynamic = "force-dynamic";

import React from 'react';
import NoFriendRequest from '../_components/friend-requests/no-request';
import { getFriendRequests } from '@/actions/omniconnect/connections/connections';
import FriendRequests from '../_components/friend-requests/friend-requests';

const FriendRequestsPage = async() => {
    const requests = await getFriendRequests(1, 10, "");

    return (
        <section className="w-full h-full">
            {
                requests.length > 0 ?
                    (
                        <FriendRequests initialRequests={requests} />
                    ) :
                    <NoFriendRequest />
            }
        </section>
    )
}

export default FriendRequestsPage;
