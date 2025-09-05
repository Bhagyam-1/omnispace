import { AlertDialog, AlertDialogCancel, AlertDialogDescription, AlertDialogContent, AlertDialogTrigger, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { PostI } from '@/app/connect/_utils/types';
import { Loader2, Trash } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { deletePost } from '@/app/connect/_services/user-profile.service';

const DeletePost = ({post}: {post: PostI}) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            setOpen(false);
            toast.success("Post deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["posts", post?.user?.userName],
            });
        },
        onError: () => {
            toast.error("Failed to delete post, please try again");
        },
        onSettled: () => {
            setLoading(false);
        }
    });
    
    const deletePostHandler = () => {
        setLoading(true);
        mutation.mutate(post._id);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className='flex items-center justify-start h-6 w-full cursor-pointer'>
                    <Trash /> Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your post.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel className='cursor-pointer' disabled={loading} onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <Button onClick={deletePostHandler} className='cursor-pointer' disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                        {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeletePost;
