import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 justify-center px-4 pt-8 lg:pt-0">
            <div className="flex flex-wrap lg:flex-nowrap content-center flex-col gap-8">
                <Badge
                    variant="outline"
                    className="bg-secondary-background/20 border-secondary-background px-4 py-2 text-secondary-foreground text-sm font-medium"
                >
                    One app, endless possibilities
                </Badge>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                    Everything you need,
                    <br />
                    <span className="gradient-title">all in one place</span>
                </h1>

                <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                    Say goodbye to app overload — manage your digital life from one powerful platform.
                </p>
            </div>

            <div className='flex items-center justify-center relative h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] w-full Object-top rounded-xl'>
                <Image
                    src="/hero.png"
                    alt="Hero"
                    fill
                    priority
                    className="object-cover rounded-xl"
                />
            </div>
        </div>
    </section>
  )
}

export default Hero;