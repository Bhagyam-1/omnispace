import React from 'react'
import { PostI } from '@/app/connect/_utils/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { EllipsisVertical } from 'lucide-react'
import EditPost from './edit-post'
import DeletePost from './delete-post'

const PostCard = ({post, isSearchedUser}: {post: PostI, isSearchedUser?: boolean}) => {
    return (
        <>
            {
                !isSearchedUser && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="link" className='cursor-pointer absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-secondary rounded-full !px-2'>
                                <EllipsisVertical className="!h-5 !w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <EditPost postInfo={post} />
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <DeletePost post={post} />
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
            <div className='w-full aspect-[1]'>
                <img src={post.content?.image?.url} alt={post.content?.image?.caption || `A post by ${post?.user?.name}`} className='w-full h-full object-cover border-1 border-muted shadow-sm rounded-md' />
            </div>
        </>
    )
}

export default PostCard;