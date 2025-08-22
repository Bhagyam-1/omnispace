"use client";

import { PostI, TabInfo, TabValue } from '@/app/connect/_utils/types';
import React from 'react';
import PostCard from '../post/post-card';
import ProfileTabLoader from './profile-tab-loader';
import { useQuery } from '@tanstack/react-query';
import { getPostsQueryOptions } from '@/app/connect/_services/user-profile.service';

export interface ProfileTabContentProps {
    tab: TabInfo;
    activeTab: string;
    userName?: string;
    isSearchedUser?: boolean;
}

const ProfileTabContent = ({tab, activeTab, userName, isSearchedUser}: ProfileTabContentProps) => {
    const {
        data: posts = [],
        isLoading: isPostsLoading,
        error: postsError,
    } = useQuery(getPostsQueryOptions(activeTab, userName));

    const {
        data: savedPosts = [],
        isLoading: isSavedPostsLoading,
        error: savedError
    } = useQuery(getPostsQueryOptions(activeTab, userName));
    
    const tabDataMap: Record<TabValue, PostI[]> = {
        posts,
        saved: savedPosts,
    };

    if(isPostsLoading && activeTab === "posts") return <ProfileTabLoader />;
    if(isSavedPostsLoading && activeTab === "saved") return <ProfileTabLoader />;

    if(postsError && activeTab === "posts") {
        return <h2 className="text-center text-2xl text-muted-foreground">Failed to fetch posts</h2>
    }

    if(savedError && activeTab === "saved") {
        return <h2 className="text-center text-2xl text-muted-foreground">Failed to fetch saved posts</h2>
    }

    return (
        tabDataMap[tab.value].length ? 
            tabDataMap[tab.value].map((post: PostI) => {
                return (
                    <section id={tab.value} key={post._id} className='relative h-48 xs:h-60 lg:h-72 xl:h-88 group'>
                        <PostCard post={post} isSearchedUser={isSearchedUser} activeTab={activeTab} />
                    </section>
                )
            }) : 
            (
                <div className="flex flex-col items-center justify-center gap-8 py-8 col-span-3">
                    {
                        tab.noDataIcon && (
                            <tab.noDataIcon className="h-12 w-12 text-muted-foreground" />
                        )
                    }
                    <p className="text-xl text-muted-foreground">{tab.noDataMessage}</p>
                </div>
            )
    )
}

export default ProfileTabContent;