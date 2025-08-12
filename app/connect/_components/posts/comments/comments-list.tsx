"use client";

import IntersectionTrigger from "@/app/news/_components/news-dashboard/intersection-trigger";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommentsI } from "@/app/connect/_utils/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { getComments } from "../../../_services/feed-post.service";

const CommentsList = ({initialComments, postId}: {initialComments: CommentsI[], postId: string}) => {
    const [comments, setComments] = useState(initialComments);
    const [loading, setLoading] = useState(false);
    const isMobile = useIsMobile();
    console.log(postId);
    
    const handleIntersect = async() => {
        setLoading(true);
        const newComments = await getComments(postId);
        setComments([...comments, ...newComments]);
        setLoading(false);
    }

    if(loading) {
        return <></>
    }

    return (
        <div className="flex flex-col gap-2 flex-1 justify-between w-full">
            {
                comments?.length ? (
                    <ul className="flex flex-col flex-1 p-1">
                        {
                            comments?.map((comment: CommentsI) => (
                                <li key={comment.id} className='flex flex-col gap-2'>
                                    <div className='flex items-center gap-2'>
                                        <img src={comment.user.image} alt={comment.user.name} className='w-12 h-12 rounded-full'/>
                                        <p>{comment.user.name}</p>
                                    </div>
                                    <p className='text-sm'>{comment.comment}</p>
                                </li>
                            ))
                        }
                        <IntersectionTrigger onIntersect={handleIntersect} />
                    </ul>
                ) : (
                    <p className='my-12 text-center text-sm my-auto'>No comments</p>
                )
            }
            <div className={`flex items-center border-t-1 bg-input ${!isMobile && "rounded-ee-md"}`}>
                <Input placeholder="Add a comment" className='flex-1 w-[200px] border-0 !bg-transparent h-14' />
                <Button variant="ghost">Post</Button>
            </div>
        </div>
    )
}

export default CommentsList;