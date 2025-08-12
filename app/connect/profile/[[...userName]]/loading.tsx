import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton"

const ProfileLoading = () => {
    return (
        <section className="flex flex-col gap-2 mt-8 mx-8">
            {
                <div className="flex flex-col sm:gap-8 gap-4">
                    <div className="flex gap-4 sm:gap-12 md:gap-24 px-24">
                        <div className="flex flex-col items-center gap-4 shrink-0">
                            <Skeleton className="w-24 h-24 md:w-30 md:h-30 lg:w-44 lg:h-44 object-cover rounded-full" />
                            <Skeleton className="h-9 w-16 md:w-32 lg:w-44" />
                        </div>
                        <div className="flex flex-col gap-6 mt-4 sm:mt-2 lg:mt-8 ml-4">
                            <Skeleton className="h-8 w-24 md:w-40 lg:w-52" />
                            <div className="flex gap-4 hidden sm:flex">
                                {
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <Skeleton key={index} className="h-8 w-24 mt-4" />
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <Separator />
                    <div className="flex gap-4 px-24">
                        <Skeleton className="h-10 w-1/2" />
                        <Skeleton className="h-10 w-1/2" />
                    </div>
                </div>
            }
        </section>
    )
}

export default ProfileLoading;
