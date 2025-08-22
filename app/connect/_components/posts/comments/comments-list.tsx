"use client";

import IntersectionTrigger from "@/app/news/_components/news-dashboard/intersection-trigger";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommentsI } from "@/app/connect/_utils/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { addCommentHandler, getComments } from "../../../_services/feed-post.service";
import Image from "next/image";
import { getUserInfo } from "../../../_services/storage.service";

const CommentsList = ({initialComments, postId}: {initialComments: CommentsI[], postId: string}) => {
    const [comments, setComments] = useState(initialComments || []);
    const [loading, setLoading] = useState(false);
    const isMobile = useIsMobile();
    const commentRef = useRef<HTMLInputElement>(null);

    const userInfo = getUserInfo();
    
    const handleIntersect = async() => {
        setLoading(true);
        const newComments = await getComments(postId);
        setComments([...comments, ...newComments]);
        setLoading(false);
    }

    const addComment = async() => {
        const comment = commentRef.current?.value;
        if(!comment || comment.trim() === "") return;

        const commentId = Date.now().toString();
        try {
            setComments((prev) => [{id: commentId, comment, user: {userName: userInfo?.userName, image: userInfo?.image}, postId} as CommentsI, ...prev]);
            if(commentRef.current) commentRef.current.value = "";

            await addCommentHandler(postId, comment);
        } catch (error) {
            setComments((prev) => prev.filter((comment) => comment.id !== commentId));
        }
    }

    if(loading) {
        return <></>
    }

    return (
        <div className="flex flex-col gap-2 flex-1 justify-between w-full">
            {
                comments?.length ? (
                    <ul className="flex flex-col flex-1 gap-4 px-2 pt-12 overflow-y-auto w-full">
                        {
                            comments?.map((comment: CommentsI) => (
                                <li key={comment.id} className='flex items-start gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <Image 
                                            src={comment.user.image}
                                            alt={comment.user.userName}
                                            className='w-10 h-10 rounded-full'
                                            width={40}
                                            height={40}
                                        />
                                        <p className='text-sm font-semibold'>{comment.user.userName}</p>
                                    </div>
                                    <p className='text-sm break-all max-w-3/5 md:max-w-1/2 xl:max-w-3/5 mt-[8px] lg:mt-[10px]'>
                                        {comment.comment}
                                    </p>
                                </li>
                            ))
                        }
                        {/* <IntersectionTrigger onIntersect={handleIntersect} /> */}
                    </ul>
                ) : (
                    <p className='my-12 text-center text-sm my-auto'>No comments</p>
                )
            }
            <div className={`flex items-center border-t-1 bg-input ${!isMobile && "rounded-ee-md"}`}>
                <Input
                    ref={commentRef}
                    placeholder="Add a comment"
                    className='flex-1 w-[200px] border-0 !bg-transparent h-14'
                    onKeyDown={(e) => e.key === "Enter" && addComment()}
                />
                <Button
                    variant="ghost"
                    onClick={addComment}
                    className="cursor-pointer !bg-transparent text-secondary-foreground hover:text-secondary-foreground/70"
                >
                    Post
                </Button>
            </div>
        </div>
    )
}

export default CommentsList;