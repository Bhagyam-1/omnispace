"use client";

import React, { useEffect, useRef } from 'react'

interface IntersectionTriggerProps {
    onIntersect: () => void
}

const IntersectionTrigger = ({onIntersect}: IntersectionTriggerProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting) {
                onIntersect();
            }
        })
        
        observer.observe(triggerRef.current!);

        return () => {
            observer.disconnect();
        }
    }, [onIntersect]);

    
    return (
        <div ref={triggerRef} className="h-1"></div>
    )
}

export default IntersectionTrigger;