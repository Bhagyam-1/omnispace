"use client";
import React from 'react'
import { PostI } from '@/app/connect/_utils/types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CreateEditPost from '../../create-edit-post/create-edit-post'
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Edit } from 'lucide-react';

const EditPost = ({postInfo}: {postInfo: PostI}) => {
    const [open, setOpen] = useState(false);

    const onUpdatePost = () => {
        setOpen(false);
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
