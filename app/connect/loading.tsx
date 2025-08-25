import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const FeedLoader = () => {
    return (
        <section className="flex flex-col items-center gap-8 p-0 xs:py-8">
            {
                <>
                    <article className='flex flex-col justify-center items-center gap-4 w-full xs:w-fit xs:px-4 py-6'>
                        <div className='flex gap-2 px-2 xs:px-0 w-full items-center'>
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <Skeleton className="h-8 w-36" />
                        </div>
                        <Skeleton className="h-[400px] md:h-[600px] w-full xs:w-[475px] xs:rounded" />
                        <div className="flex items-center justify-between px-3 w-full">
                            <div className="flex gap-6 items-center">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                            <Skeleton className="h-7 w-6 rounded" />
                        </div>
                    </article>
                    <Separator className='xs:!w-[475px]' />
                </>
            }
        </section>
    )
}

export default FeedLoader;