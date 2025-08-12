import { Skeleton } from "@/components/ui/skeleton";

const RequestsLoading = () => {
    return (
        <section className="w-full h-full px-8 pt-12">
            <div className="flex flex-col gap-12">
                <Skeleton className="h-10 w-full xs:w-1/2 p-5" />
                <ul className="grid grid-cols-1 xs:grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-4 sm:gap-8 w-full">
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton key={index} className="h-44 w-full" />
                            ))
                        }
                </ul>
            </div>
        </section>
    )
}

export default RequestsLoading;