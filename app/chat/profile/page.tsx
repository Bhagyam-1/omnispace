import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Bookmark, Grid2X2Plus } from 'lucide-react'
import PostCard from '../_components/profile/post-card'
import { getLoggedInUser } from '@/actions/omnichat/users'

const ProfilePage = async() => {
    const user = await getLoggedInUser();    

    const posts = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=500&q=60",
            likes: 10,
            comments: 2
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60",
            likes: 24,
            comments: 5
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=60",
            likes: 15,
            comments: 3
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=60",
            likes: 32,
            comments: 8
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=60",
            likes: 18,
            comments: 4
        }
    ];

    const savedPosts = [
        {
            id: 101,
            image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=500&q=60",
            likes: 20,
            comments: 3
        },
        {
            id: 102,
            image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=60",
            likes: 12,
            comments: 1
        },
        {
            id: 103,
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60",
            likes: 35,
            comments: 6
        },
        {
            id: 104,
            image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=500&q=60",
            likes: 28,
            comments: 4
        },
        {
            id: 105,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=60",
            likes: 16,
            comments: 2
        }
    ];
    
    return (
        <section className="m-auto p-8">
            <div className='flex flex-col sm:gap-8 gap-4'>
                <div className='lg:px-24 md:px-12 px-0 flex gap-4 sm:gap-12 md:gap-24'>
                    <div className='flex flex-col items-center gap-4'>
                        {
                            user.image ? (
                                <img 
                                    src={user.image} 
                                    alt={user.name} 
                                    className='w-24 h-24 md:w-30 md:h-30 lg:w-44 lg:h-44 object-cover rounded-full'
                                />
                            ) : (
                                <Image
                                    src="/profile.jpg"
                                    alt="Profile"
                                    width={100}
                                    height={100}
                                    className='w-24 h-24 md:w-30 md:h-30 lg:w-44 lg:h-44 object-cover rounded-full'
                                />
                            )
                        }
                        <Button variant="outline" className='w-full cursor-pointer'>Edit Profile</Button>
                    </div>
                    <div className='flex flex-col gap-6 mt-8 sm:mt-2 lg:mt-8'>
                        <h2 className='text-3xl font-semibold pl-4'>{user.name}</h2>
                        <div className='hidden sm:flex gap-2'>
                            <Button variant="ghost" className='text-md sm:text-lg text-muted-foreground cursor-pointer w-fit'>
                                {user.postsLength} Posts
                            </Button>
                            <Button variant="ghost" className='text-md sm:text-lg text-muted-foreground cursor-pointer w-fit'>
                                {user.friendsLength} Friends
                            </Button>
                            <Button variant="ghost" className='text-md sm:text-lg text-muted-foreground cursor-pointer w-fit'>
                                {user.requestsLength} Requests
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center sm:hidden gap-4 mt-4'>
                    <Separator />
                    <div className='gap-2'>
                        <Button variant="ghost" className='text-md sm:text-lg text-muted-foreground cursor-pointer w-fit'>
                            {user.postsLength} Posts
                        </Button>
                        <Button variant="ghost" className='text-md sm:text-lg text-muted-foreground cursor-pointer w-fit'>
                            {user.friendsLength} Friends
                        </Button>
                        <Button variant="ghost" className='text-md sm:text-lg text-muted-foreground cursor-pointer w-fit'>
                            {user.requestsLength} Requests
                        </Button>
                    </div>
                </div>
                <Separator />
                <Tabs defaultValue="posts" className='mt-4 sm:mt-0 sm:px-12 lg:px-24'>
                    <TabsList className='flex gap-2 bg-transparent'>
                        <TabsTrigger value="posts" className='text-lg font-semibold px-8 py-4 border-none bg-transparent cursor-pointer'>
                            <Grid2X2Plus /> Posts
                        </TabsTrigger>
                        <TabsTrigger value="saved" className='text-lg font-semibold px-8 py-4 border-none bg-transparent cursor-pointer'>
                            <Bookmark /> Saved
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="posts">
                        <div className='grid grid-cols-3 gap-2 py-8'>
                            {
                                posts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value="saved">
                        <div className='grid grid-cols-3 gap-2 py-8'>
                            {
                                savedPosts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))
                            }
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default ProfilePage;