export const dynamic = "force-dynamic";

import React, { Fragment } from 'react'
import FeedCard from './_components/posts/feed-card';
import { Separator } from '@/components/ui/separator';
import { getPosts } from '@/actions/omniconnect/posts/post';
import { Grid2X2X } from 'lucide-react';

const ChatsHomePage = async() => {
  const posts = await getPosts();

  if(posts.length === 0) {
    return (
      <section className='flex flex-col items-center justify-center gap-8 p-0 xs:p-8 h-full'>
        <Grid2X2X className='w-16 h-16 text-muted-foreground' />
        <h2 className='text-2xl text-muted-foreground'>No posts found</h2>
      </section>
    )
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
