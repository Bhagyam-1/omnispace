"use client";

import { Button } from "@/components/ui/button"

const Error = (error: Error, reset: () => void) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-full">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <pre className="text-sm">{error.message}</pre>
            <Button onClick={reset}>Try again</Button>
        </div>
    )
}

export default Error;
