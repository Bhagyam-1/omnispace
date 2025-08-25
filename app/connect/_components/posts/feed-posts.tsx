"use client";

import React, { Fragment } from 'react';
import FeedCard from './feed-card';
import { Separator } from '@/components/ui/separator';
import { PostI } from '@/app/connect/_utils/types';
import { useState } from 'react';
import IntersectionTrigger from '@/app/news/_components/news-dashboard/intersection-trigger';
import { getPosts } from '@/actions/omniconnect/posts/post';
import FeedLoading from '../../loading';

const FeedPosts = ({initialPosts}: {initialPosts: PostI[]}) => {
    const limit = 6;
    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(6);
    const [loading, setLoading] = useState(false);
    const [lastPagePostsLength, setLastPagePostsLength] = useState(initialPosts.length);
    
    const fetchPosts = async() => {
        if(lastPagePostsLength < limit) {
            return;
        }

        setLoading(true);
        setPage((prev) => prev + 1);
        const newPosts = await getPosts(page, limit);
        setPosts((prev) => [...prev, ...newPosts]);
        setLastPagePostsLength(newPosts.length);
        setLoading(false);
    }
    
    return (
        <>
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
            <IntersectionTrigger onIntersect={fetchPosts} />
            {
                loading && (
                    <FeedLoading />
                )
            }
        </>
    )
}

export default FeedPosts;
