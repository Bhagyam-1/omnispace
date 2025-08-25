import { useEffect } from "react";

const useDebounce = (value: string, delay: number, fn: () => void) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            fn();
        }, delay);

        return () => clearTimeout(handler);
    }, [value]);
}

export default useDebounce;
