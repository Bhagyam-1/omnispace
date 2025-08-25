import { Skeleton } from "@/components/ui/skeleton";

const FriendsListLoader = () => {
    return (
        <div className="flex flex-col flex-1 gap-4 h-full border-r border-r-secondary md:w-fit pt-8">
            <Skeleton className="mx-4 w-[calc(100%-2rem)] lg:min-w-72 md:min-w-52 h-9" />
            <nav className="flex-1 max-h-[calc(100vh-10rem)] overflow-y-auto w-full mt-4">
                <ul className="flex flex-col justify-center md:justify-start gap-2 w-full">
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <li key={index} className="w-full rounded-lg py-2 px-4">
                                <div className="flex justify-start items-center gap-4">
                                    <Skeleton className="w-14 h-14 rounded-full" />
                                    <Skeleton className="w-52 md:w-36 h-6" />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default FriendsListLoader;