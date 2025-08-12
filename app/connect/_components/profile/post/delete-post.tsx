import { AlertDialog, AlertDialogCancel, AlertDialogDescription, AlertDialogContent, AlertDialogTrigger, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import React from 'react'
import { deletePost } from '@/actions/omniconnect/posts/post'
import { toast } from 'sonner'
import { PostI } from '@/app/connect/_utils/types'

const DeletePost = ({post}: {post: PostI}) => {
    const deletePostHandler = async() => {
        try {
            await deletePost(post)
            toast.success("Post deleted successfully");
        } catch (error) {
            if(error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to delete post, please try again");
            }
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="link" className='flex items-center justify-start px-0 py-1 h-6 w-full cursor-pointer hover:no-underline'>
                    Delete
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
                    <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deletePostHandler} className='cursor-pointer'>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeletePost;
