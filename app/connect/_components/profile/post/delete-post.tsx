import { AlertDialog, AlertDialogCancel, AlertDialogDescription, AlertDialogContent, AlertDialogTrigger, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { deletePost } from '@/actions/omniconnect/posts/post'
import { toast } from 'sonner'
import { PostI } from '@/app/connect/_utils/types'
import { Loader2, Trash } from 'lucide-react';

const DeletePost = ({post}: {post: PostI}) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    
    const deletePostHandler = async() => {
        try {
            setLoading(true);
            await deletePost(post._id);
            setOpen(false);
            toast.success("Post deleted successfully");
        } catch (error) {
            if(error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to delete post, please try again");
            }
        } finally {
            setLoading(false);
        }
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
