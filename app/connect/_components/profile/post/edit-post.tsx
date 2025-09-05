"use client";
import React from 'react'
import { PostI } from '@/app/connect/_utils/types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CreateEditPost from '../../create-edit-post/create-edit-post'
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Edit } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const EditPost = ({postInfo}: {postInfo: PostI}) => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    
    const onUpdatePost = () => {
        setOpen(false);
        queryClient.invalidateQueries({
            queryKey: ["posts", postInfo?.user?.userName],
        });
    }
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="ghost" className='flex items-center justify-start h-6 w-full cursor-pointer hover:no-underline'>
                <Edit /> Edit
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogDescription>
                Update the image or text of your post.
                </DialogDescription>
            </DialogHeader>
            <CreateEditPost isNewPost={false} postInfo={postInfo} onUpdatePost={onUpdatePost} />
        </DialogContent>
    </Dialog>
  )
}

export default EditPost
