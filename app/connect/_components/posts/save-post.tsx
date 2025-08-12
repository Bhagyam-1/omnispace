import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { toggleSavePostStatus } from '../../_services/feed-post.service';
import { PostI } from '../../_utils/types';

const SavePost = ({post}: {post: PostI}) => {
    const [isSaved, setIsSaved] = React.useState(post.hasUserSaved);
    
    const mutation = useMutation({
        mutationFn: async({postId, isSaved}: {postId: string, isSaved: boolean}) => {
            setIsSaved(!isSaved);
            await toggleSavePostStatus(postId);
        },
        onMutate: ({isSaved}: {isSaved: boolean}) => {
            const rollback = {
                isSaved
            }

            setIsSaved(!isSaved);
            return rollback;
        },
        onError: (_err, _vars, ctx) => {
            if(ctx)
                setIsSaved(ctx.isSaved);
        }
    })

    const onToggleSavePost = () => {
        mutation.mutate({postId: post._id, isSaved});
    }

    return (
        <Button
            variant="link"
            onClick={onToggleSavePost}
            className='cursor-pointer hover:text-input'
        >
            <Bookmark className={`!h-6 !w-6 ${isSaved && "fill-primary"}`} />
        </Button>
    )
}

export default SavePost
