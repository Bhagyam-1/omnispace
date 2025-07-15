import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bookmark, Heart, MessageCircle } from 'lucide-react'

const FeedCard = ({post}: {post: any}) => {
    return (
        <Card className='h-fit flex bg-transparent w-full sm:w-4/5 lg:w-1/2'>
            <CardHeader className='flex gap-4 items-center'>
                <img src={post.user.image} alt={post.user.name} className='h-12 w-12 rounded-full object-cover' />
                <h2 className='text-md font-semibold'>{post.user.name}</h2>
            </CardHeader>
            <CardContent>
                <img src={post.image} alt={post.title || `A post by ${post.user.name}`}
                className='h-[400px] md:h-[600px] w-full object-cover rounded' />
            </CardContent>
            <CardFooter>
                <div className='flex gap-2 justify-between items-center w-full'>
                    <div className='flex gap-2'>
                        <Button variant="ghost" className='cursor-pointer'>
                            <Heart className="!h-6 !w-6" />
                        </Button>
                        <Button variant="ghost" className="cursor-pointer">
                            <MessageCircle className="!h-6 !w-6" />
                        </Button>
                    </div>
                    <Button size="lg" variant="ghost" className='cursor-pointer'>
                        <Bookmark className="!h-6 !w-6" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default FeedCard;