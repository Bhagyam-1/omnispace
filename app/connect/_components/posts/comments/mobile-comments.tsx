import React from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import CommentsList from './comments-list';
import LoadComments from './load-comments';

interface MobileCommentsProps {
    comments: any;
    postId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    isLoading: boolean;
}

const MobileComments = ({comments, postId, open, setOpen, isLoading}: MobileCommentsProps) => {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button 
                    variant="link"
                    className="cursor-pointer hover:text-input no-underline hover:no-underline"
                >
                    <MessageCircle className="!h-6 !w-6" />
                    {/* <p className="text-sm font-semibold">
                        {comments?.length || 0}
                    </p> */}
                </Button>
            </DrawerTrigger>
            <DrawerContent className='h-[80%]'>
                <DrawerHeader>
                    <DrawerTitle>Comments</DrawerTitle>
                    <DrawerDescription className='text-sm font-semibold sr-only'>
                        ({comments?.length || 0} comments)
                    </DrawerDescription>
                </DrawerHeader>
                <section className='flex flex-1'>
                    {
                        isLoading ?
                            <LoadComments /> : 
                            <CommentsList initialComments={comments} postId={postId}/>
                    }
                </section>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileComments
