import { Skeleton } from "@/components/ui/skeleton";

const ChatLoading = () => {
    return (
        <section className="flex flex-col gap-4 h-full w-full mt-4">
            <div className="flex gap-2 items-center p-2 md:p-4 mx-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <Skeleton className="h-8 w-32" />
            </div>
            <div className="flex flex-col gap-8 flex-1 px-2 md:px-4 mx-4">
                <div className="flex flex-col flex-1 max-h-[calc(100vh-18rem)] md:max-h-[calc(100vh-20rem)] overflow-y-auto gap-4">
                    {
                        Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className={`w-full max-w-2/5 lg:max-w-1/3 mb-4 p-4 rounded-lg ${index % 2 === 0 ? 'self-end mr-4' : 'self-start'}`}>
                                <Skeleton className="h-12 w-full" />
                            </div>
                        ))
                    }
                </div>
                <Skeleton className="h-14 w-full" />
            </div>
        </section>
    )
}

export default ChatLoading;