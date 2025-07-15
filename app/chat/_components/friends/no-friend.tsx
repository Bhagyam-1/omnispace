import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FrownIcon } from 'lucide-react'
import Link from 'next/link'

const NoFriend = () => {
    return (
        <section className='flex items-center justify-center h-full'>
            <Card className="flex justify-center items-center w-fit mt-24 mx-auto">
                <CardContent className="flex flex-col gap-4 justify-center items-center w-fit p-8 rounded-lg">
                    <FrownIcon className="w-16 h-16 text-primary" />
                    <div className="flex flex-col gap-2 text-center">
                        <h2 className="text-primary text-2xl">No friends found</h2>
                        <p className="text-primary">Don't worry, start making new friends by going to the feed</p>
                    </div>
                </CardContent>
                <CardFooter className="w-full">
                    <Button variant="outline" asChild className='w-full'>
                        <Link href="/chat">Go to feed</Link>
                    </Button>
                </CardFooter>
            </Card>
        </section>
    )
}

export default NoFriend
