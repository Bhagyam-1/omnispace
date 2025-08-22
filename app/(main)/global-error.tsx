"use client"

import { Button } from "@/components/ui/button";

const GlobalError = (error: Error, reset: () => void) => {
    return (
        <html>
            <body>
                <h1>Something went wrong!!!</h1>
                <pre>{error.message}</pre>
                <Button variant="outline" onClick={reset}>Try again</Button>
            </body>
        </html>
    )
}

export default GlobalError;
