export const dynamic = "force-dynamic";

import React from 'react';
import { getPosts } from '@/actions/omniconnect/posts/post';
import { Grid2X2X } from 'lucide-react';
import FeedPosts from './_components/posts/feed-posts';

const ChatsHomePage = async() => {
  const posts = await getPosts(1, 6);

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
      <FeedPosts initialPosts={posts} />
    </section>
  )
}

export default ChatsHomePage;
