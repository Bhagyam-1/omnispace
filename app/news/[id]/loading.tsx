import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton";

const NewsIdLoading = () => {
    return (
        <section className='w-full mt-32' aria-labelledby='article'>
            <div className='grid grid-cols lg:grid-cols-3 gap-4 justify-center w-full'>
                <div 
                    className='w-full lg:col-span-2 flex flex-col gap-4 sm:bg-muted/30 sm:p-7 rounded-lg'
                >
                    <div className='flex flex-col gap-2'>
                        <Skeleton className='h-16 w-full pb-2' />
                        <Separator />
                        <Skeleton className='h-8 w-20' />
                    </div>
                    <Skeleton className='h-6 mt-4' />
                    <Skeleton className='w-11/12 h-64 md:h-96 2xl:h-[600px] rounded-lg my-4' />
                    <span className='mt-4 text-muted-foreground'>
                        <span>
                            <Skeleton className='h-12 w-11/12' />
                        </span>
                    </span>
                </div>

                <aside className='md:col-span-1 sm:bg-muted/30 sm:p-4 rounded-lg' aria-labelledby='related-news'>
                    <div className='flex flex-col gap-4'>
                        <Skeleton className='h-10 w-40 max-w-full mx-4 mt-4' />
                        <Separator />
                        {
                            Array.from({ length: 2 }, (_, i) => (
                                <div key={i} className='flex flex-col gap-4 mt-4'>
                                    <Skeleton className='h-10 w-full' />
                                    <Skeleton className='h-32 sm:h-44 w-full rounded-md' />
                                    {i < 1 && <Separator />}
                                </div>
                            ))
                        }
                    </div>
                </aside>
            </div>
        </section>
    )
}
    
export default NewsIdLoading;
