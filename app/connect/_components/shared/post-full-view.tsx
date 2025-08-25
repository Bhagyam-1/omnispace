import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PostI, PostType } from '@/app/connect/_utils/types'
import Image from 'next/image'

const PostFullView = ({children, post}: {children: React.ReactNode, post: PostI}) => {
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='cursor-pointer h-full w-full'>{children}</div>
            </DialogTrigger>
            <DialogContent className='!max-w-[80%] w-[80%] h-[80%] p-0 overflow-hidden'>
                <DialogHeader className='sr-only'>
                    <DialogTitle>Post Full View</DialogTitle>
                </DialogHeader>
                {post?.content?.type === PostType.TEXT && (
                    <div className="flex items-center justify-center h-full border-1 border-muted shadow-sm rounded-md">
                        <p 
                            className='w-[80%] px-4 bg-foreground text-background/80 text-base sm:text-lg line-clamp-20'
                        >
                            {post?.content?.text}
                        </p>
                    </div>
                )}
                {post?.content?.type === PostType.IMAGE && (
                    <Image
                        src={post?.content?.image?.url || ""}
                        alt={`A post by ${post?.user?.userName} with caption ${post?.content?.image?.caption}`}
                        className='object-contain rounded w-2/3 h-full'
                        fill
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default PostFullView;
