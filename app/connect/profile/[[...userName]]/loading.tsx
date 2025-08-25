import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton"

const ProfileLoader = () => {
    return (
        <section className="flex flex-col gap-2 mt-8 mx-8">
            {
                <div className="flex flex-col sm:gap-8 gap-4">
                    <div className="flex gap-4 sm:gap-12 md:gap-24 px-4 sm:px-24">
                        <div className="flex flex-col items-center gap-4 shrink-0">
                            <Skeleton className="w-24 h-24 md:w-30 md:h-30 lg:w-44 lg:h-44 object-cover rounded-full" />
                            <Skeleton className="h-9 w-24 md:w-32 lg:w-44" />
                        </div>
                        <div className="flex flex-col gap-8 mt-4 sm:mt-2 lg:mt-8 ml-4">
                            <Skeleton className="h-11 w-40 xs:w-64 sm:w-full" />
                            <div className="flex gap-4 hidden sm:flex">
                                {
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <Skeleton key={index} className="h-8 w-24" />
                                    ))
                                }
                            </div>
                            <Skeleton className="h-7 w-32 md:w-40 lg:w-52" />
                        </div>
                    </div>

                    <Separator />
                    <div className="flex justify-center items-center gap-4 px-4 sm:hidden w-full">
                        {
                            Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton key={index} className="h-8 w-24 max-w-1/3 mt-4" />
                            ))
                        }
                    </div>
                    <Separator className="mb-8 flex sm:hidden" />

                    <div className="flex gap-4 px-4">
                        {
                            Array.from({ length: 2 }).map((_, index) => (
                                <Skeleton key={index} className="h-10 w-1/2" />
                            ))
                        }
                    </div>
                </div>
            }
        </section>
    )
}

export default ProfileLoader;
