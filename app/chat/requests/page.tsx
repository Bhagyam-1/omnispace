import React from 'react';
import FriendRequestCard from '../_components/friend-requests/friend-request-card';
import NoFriendRequest from '../_components/friend-requests/no-request';

const requests: any = [
    {
        id: 1,
        name: "John Doe",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: 2,
        name: "Cristina Doe",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: 3,
        name: "Neuster Doe",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: 4,
        name: "Creator Doe",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    }
];

const FriendRequestsPage = () => {
  return (
    <section className="py-16 sm:px-12 w-full h-full">
        {
            requests.length > 0 ?
                (
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(330px,_1fr))] gap-8">
                        {
                            requests.map((request: any) => 
                                <FriendRequestCard key={request.id} request={request} />
                            )
                        }
                    </div> 
                ) :
                <NoFriendRequest />
        }
    </section>
  )
}

export default FriendRequestsPage;