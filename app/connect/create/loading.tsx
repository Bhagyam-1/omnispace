import { Skeleton } from "@/components/ui/skeleton";

const CreateLoader = () => {
    return (
        <div className="max-w-xl mx-auto p-6 space-y-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="w-full rounded-lg h-96 md:h-88" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="w-full h-9" />
        </div>
    )
}

export default CreateLoader;