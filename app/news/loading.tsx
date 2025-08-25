import { Skeleton } from "@/components/ui/skeleton"

const NewsLoader = () => {
    return (
        <section className="flex flex-col gap-8 w-full my-8">
            <Skeleton className="w-1/2 h-8 rounded-lg p-5" />
            <div className="sm:bg-muted/30 p-0 sm:p-2 md:p-4 rounded-lg">
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] items-center gap-8 w-full h-fit">
                    {
                        Array.from({ length: 10 }, (_, i) => (
                            <div key={i} className="h-fit flex flex-col gap-4 p-4">
                                <Skeleton className="h-44 sm:h-50 w-full rounded-md my-4" />
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default NewsLoader;