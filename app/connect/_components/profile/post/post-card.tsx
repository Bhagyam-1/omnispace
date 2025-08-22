import React from 'react';
import { PostI, PostType } from '@/app/connect/_utils/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EllipsisVertical } from 'lucide-react';
import EditPost from './edit-post';
import DeletePost from './delete-post';
import Image from 'next/image';
import SavePost from '../../posts/save-post';

interface PostCardProps {
    post: PostI;
    isSearchedUser?: boolean;
    activeTab: string;
}

const PostCard = ({post, isSearchedUser, activeTab}: PostCardProps) => {

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
                                {
                                    activeTab === "posts" && (
                                        <>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                <EditPost postInfo={post} />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                <DeletePost post={post} />
                                            </DropdownMenuItem>
                                        </>
                                    )
                                }
                                {
                                    activeTab === "saved" && (
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                            <SavePost post={{...post, hasUserSaved: true}} showUnsaveBtn={true} />
                                        </DropdownMenuItem>
                                    )
                                }
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
            {
                post.content?.type === PostType.TEXT && (
                    <div className="flex items-center justify-center h-full border-1 border-muted shadow-sm rounded-md">
                        <p 
                            className='w-full px-4 bg-foreground text-background/80 text-base sm:text-lg line-clamp-6 xl:line-clamp-10'
                        >
                            {post?.content?.text}
                        </p>
                    </div>
                )
            }
            {
                post.content?.type === PostType.IMAGE && (
                    <Image 
                        src={post.content?.image?.url || ""} 
                        alt={post.content?.image?.caption || `A post by ${post?.user?.name}`} 
                        className='w-full h-full object-cover border-1 border-muted shadow-sm rounded-md' 
                        width={500}
                        height={500}
                    />
                )
            }
        </>
    )
}

export default PostCard;