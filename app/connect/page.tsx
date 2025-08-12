export const dynamic = "force-dynamic";

import React, { Fragment } from 'react'
import FeedCard from './_components/posts/feed-card';
import { Separator } from '@/components/ui/separator';
import { getPosts } from '@/actions/omniconnect/posts/post';
import { PostI } from './_utils/types';

const ChatsHomePage = async() => {
    let posts: PostI[] = [];
    try {
        posts = await getPosts();
    } catch (error) {
        console.log(error);
    }

  return (
    <section className='flex flex-col items-center gap-8 p-0 xs:p-8'>
      {
        posts?.map((post, postIndex) => (
          post && (
          <Fragment key={post._id}>
            <FeedCard post={post} />
            {
                postIndex !== posts?.length - 1 && (
                    <Separator className='xs:!w-[475px]' />
                )
            }
          </Fragment>
          )
        ))
      }
    </section>
  )
}

export default ChatsHomePage;

//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=500&q=60",
//     likes: 10,
//     comments: 2,
//     user: {
//       name: "John Doe",
//       image: "https://randomuser.me/api/portraits/men/32.jpg"
//     }
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60",
//     likes: 24,
//     comments: 5,
//     user: {
//       name: "Emily Smith",
//       image: "https://randomuser.me/api/portraits/women/44.jpg"
//     }
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=60",
//     likes: 15,
//     comments: 3,
//     user: {
//       name: "Michael Lee",
//       image: "https://randomuser.me/api/portraits/men/65.jpg"
//     }
//   },
//   {
//     id: 4,
//     image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=60",
//     likes: 32,
//     comments: 8,
//     user: {
//       name: "Sophia Patel",
//       image: "https://randomuser.me/api/portraits/women/68.jpg"
//     }
//   },
//   {
//     id: 5,
//     image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=60",
//     likes: 18,
//     comments: 4,
//     user: {
//       name: "Daniel Kim",
//       image: "https://randomuser.me/api/portraits/men/91.jpg"
//     }
//   }
// ];