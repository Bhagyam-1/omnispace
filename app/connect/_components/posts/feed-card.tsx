import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { PostI, PostType } from '@/app/connect/_utils/types';
import FeedFooterActions from './feed-footer-actions';
import QueryProvider from '../../_utils/query-provider';
import Link from 'next/link';
import Image from 'next/image';

const FeedCard = ({post}: {post: PostI}) => {
    return (
        <article className='flex justify-center w-full xs:px-4'>
            <Card className='h-fit flex flex-col gap-3 bg-transparent border-0 w-full xs:w-fit'>
                <CardHeader className='flex items-center gap-3 px-3 xs:px-6 w-full'>
                    <Link href={`/connect/profile/${post?.user?.userName}`} className='flex items-center gap-2'>
                        <Image 
                            src={post?.user?.image} 
                            alt={`Profile icon of ${post?.user?.userName}`} 
                            className='h-8 w-8 rounded-full object-cover' 
                            width={32}
                            height={32}
                        />
                        <h2 className='text-sm font-semibold'>{post?.user?.userName}</h2>
                    </Link>
                </CardHeader>
                <CardContent className='p-0 xs:px-6'>
                    {
                        post?.content?.type === PostType.IMAGE && (
                            <Image 
                                src={post?.content?.image?.url || ""} 
                                alt={`A post by ${post?.user?.userName} with caption ${post?.content?.image?.caption}`}
                                className='h-[400px] md:h-[500px] w-full xs:w-[475px] object-contain xs:rounded' 
                                width={400} 
                                height={400} 
                            />
                        )
                    }
                    {
                        post?.content?.type === PostType.TEXT && (
                            <p className='text-lg text-muted-foreground line-clamp-10 w-full xs:w-[475px] my-4 px-3 xs:p-0'>
                                {post?.content?.text}
                            </p>
                        )
                    }
                </CardContent>
                <CardFooter className='p-0 xs:px-3 flex flex-col gap-2 text-left'>
                    <QueryProvider>
                        <FeedFooterActions post={post} />
                    </QueryProvider>
                    {
                        (
                            post?.content?.type === PostType.IMAGE && post?.content?.image?.caption
                        ) && 
                        (
                            <div className='flex flex-col gap-2 self-start pl-3'>
                                <p className='text-sm text-muted-foreground line-clamp-2 w-full xs:w-[475px]'>
                                    <span className='text-primary font-semibold'>{post?.user?.userName}:</span> {post?.content?.image?.caption}
                                </p>
                            </div>
                        )
                    }
                </CardFooter>
            </Card>
        </article>
    )
}

export default FeedCard;