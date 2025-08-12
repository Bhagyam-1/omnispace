"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { PostI } from '@/app/connect/_utils/types';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { updateLikes } from '../../_services/feed-post.service';
import FeedCommentsStructure from './comments/feed-comments-structure';
import SavePost from './save-post';

interface FeedFooterActionsProps {
    post: PostI;
}

const FeedFooterActions = ({post}: FeedFooterActionsProps) => {
    const [hasUserLiked, setHasUserLiked] = React.useState(post.hasUserLiked);
    const [likes, setLikes] = React.useState(post.likes);

    const mutation = useMutation({
        mutationFn: async({postId, isLiked}: {postId: string, isLiked: boolean}) => {
            await updateLikes(postId, isLiked)
        },
        onMutate: ({isLiked}: {isLiked: boolean}) => {
            const rollback = {
                hasUserLiked,
                likes
            }

            setHasUserLiked(isLiked);
            setLikes((prev) => Math.max(0, isLiked ? prev + 1 : prev - 1));

            return rollback;
        },
        onError: (_err, _vars, ctx) => {
            if (ctx) {
                setHasUserLiked(ctx.hasUserLiked);
                setLikes(ctx.likes);
            }
            toast.error('Something went wrong');
        }
    })
    
    const onLikeBtnClick = async () => {
        mutation.mutate({postId: post._id, isLiked: !hasUserLiked});
    };

    return (
        <div className='flex gap-2 justify-between items-center w-full'>
            <div className='flex gap-2'>
                <div className='flex items-center'>
                    <Button 
                        variant="link" 
                        onClick={onLikeBtnClick}
                        className='cursor-pointer hover:text-input'
                    >
                        <Heart className={`!h-6 !w-6 ${hasUserLiked && "fill-red-500"}`} />
                    </Button>
                    <p className='text-sm font-semibold'>{likes}</p>
                </div>
                <FeedCommentsStructure post={post} postId={post._id} />
            </div>
            <SavePost post={post} />
        </div>
    )
}

export default FeedFooterActions;
