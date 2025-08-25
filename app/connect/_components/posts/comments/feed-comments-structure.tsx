import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { createCommentQueryOptions } from '../../../_services/feed-post.service';
import { useIsMobile } from '@/hooks/use-mobile';
import { MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CommentsList from './comments-list';
import MobileComments from './mobile-comments';
import { PostI } from '@/app/connect/_utils/types';
import { PostType } from '@/app/connect/_utils/types';
import Image from 'next/image';
import LoadComments from './load-comments';

const FeedCommentsStructure = ({postId, post}: {postId: string, post: PostI}) => {
    const [open, setOpen] = useState(false);
    const {data: comments, isLoading} = useQuery(createCommentQueryOptions(open, postId));
    const isMobile = useIsMobile();
    
    if(isMobile) {
        return <MobileComments
            comments={comments}
            postId={postId}
            open={open}
            setOpen={setOpen}
            isLoading={isLoading}
        />
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="link"
                    className="cursor-pointer hover:text-input no-underline hover:no-underline"
                >
                    <MessageCircle className="!h-6 !w-6" />
                    {/* <p className="text-sm font-semibold">
                        {comments?.length || 0}
                    </p> */}
                </Button>
            </DialogTrigger>
            <DialogContent className='!max-w-[80%] w-[80%] h-[80%] p-0 overflow-hidden'>
                <DialogHeader className='flex w-full items-center sr-only'>
                    <DialogTitle>Comments</DialogTitle>
                    <DialogDescription>
                        {comments?.length || 0} comments
                    </DialogDescription>
                </DialogHeader>
                <section className='flex overflow-hidden'>
                    <div className='relative w-1/2 h-full border-1 flex items-center'>
                        {
                            post?.content?.type === PostType.IMAGE && (
                                <Image 
                                    src={post?.content?.image?.url || ""} 
                                    alt={`A post by ${post?.user?.userName} with caption ${post?.content?.image?.caption}`}
                                    className='object-contain rounded w-full'
                                    fill
                                />
                            )
                        }
                        {
                            post?.content?.type === PostType.TEXT && (
                                <p className='text-md text-muted-foreground line-clamp-10 px-4'>
                                    <span className='text-primary/70 font-lg'>{post?.content?.text}</span>
                                </p>
                            )
                        }
                    </div>
                    {
                        isLoading ?
                            <LoadComments /> : 
                            <CommentsList initialComments={comments} postId={postId}/>
                    }
                </section>
            </DialogContent>
        </Dialog>
    )
}

export default FeedCommentsStructure;
