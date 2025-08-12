"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Logo = ({showSidebar = false, open = false}: {showSidebar?: boolean, open?: boolean}) => {
    const { resolvedTheme } = useTheme();

    return (
        <Link href="/" className={`${showSidebar && "mt-2 mb-12"} flex items-center`}>
            {
                resolvedTheme ? (
                    <Image
                        key={resolvedTheme}
                        src={`/${resolvedTheme}-logo.png`}
                        alt="Logo - Omnispace"
                        width={40}
                        height={40}
                        className="h-10 w-auto"
                        priority
                    />
                ) : (
                    // Placeholder div to avoid CLS
                    <div className="h-10 w-10" />
                )
            }
            <span className={`text-xl text-primary font-semibold ${!showSidebar && "hidden md:block"} ${showSidebar && !open && "opacity-0"}`}>
                mnispace
            </span>
        </Link>
    );
};

export default Logo;