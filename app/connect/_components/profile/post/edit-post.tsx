"use client";
import React from 'react'
import { PostI } from '@/app/connect/_utils/types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CreateEditPost from '../../create-edit-post/create-edit-post'
import { Button } from '@/components/ui/button'

const EditPost = ({postInfo}: {postInfo: PostI}) => {
    
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="link" className='flex items-center justify-start px-0 py-1 h-6 w-full cursor-pointer hover:no-underline'>
                Edit
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogDescription>
                Update the image or text of your post.
                </DialogDescription>
            </DialogHeader>
            <CreateEditPost isNewPost={false} postInfo={postInfo} />
        </DialogContent>
    </Dialog>
  )
}

export default EditPost
