import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import React from 'react'
import { UserI } from '../../_utils/types'
import Image from 'next/image'
import { sendFriendRequest } from '@/actions/omniconnect/connections/connections'
import { toast } from 'sonner'
import Link from 'next/link'

interface SearchedUsersPropsI {
  users: UserI[];
  removeUser: (userIndex: number) => void;
}

const SearchedUsers = ({users, removeUser}: SearchedUsersPropsI) => {
  const sendFriendRequestToUser = async(userId: string, userIndex: number) => {
    try {
      await sendFriendRequest(userId);
      toast.success("Friend Request Sent", {
        description: "Friend request sent successfully"
      });

      removeUser(userIndex);
    } catch(err) {
      if(err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to send friend request");
      }
    }
  }

  return (
    users?.map((user, userIndex) => (
        <li key={user._id} className='flex items-center w-full justify-between p-4'>
            <Link href={`/connect/profile/${user.userName}`} className='flex items-center gap-4'>
              {
                user.image ? (
                  <Image src={user.image} alt="User"
                    className='h-12 w-12 rounded-full object-cover'
                    width={48}
                    height={48}
                  />
                ) : (
                  <Image src="/profile.jpg" alt="Profile"
                    className='h-12 w-12 rounded-full object-cover'
                    width={48}
                    height={48}
                  />
                )
              }
              <h2 className='text-md font-semibold line-clamp-1'>{user.userName}</h2>
            </Link>
            <Button variant="outline" size="icon" className='cursor-pointer rounded-full p-1' onClick={() => sendFriendRequestToUser(user._id, userIndex)}>
                <UserPlus className="h-5 w-5" />
            </Button>
        </li>
    ))
  )
}

export default SearchedUsers;
