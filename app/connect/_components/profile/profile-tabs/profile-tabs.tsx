"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import { tabsInfo } from '@/app/connect/_utils/config';
import ProfileTabContent from './profile-tab-content';
import QueryProvider from '@/app/connect/_utils/query-provider';

interface ProfileTabsProps {
    userName: string;
    isSearchedUser: boolean;
}

const ProfileTabs = ({userName, isSearchedUser}: ProfileTabsProps) => {
    const [activeTab, setActiveTab] = useState("posts");
        
    return (
        <Tabs defaultValue="posts" className='mt-4 sm:mt-0 sm:px-12 lg:px-24' onValueChange={setActiveTab}>
            <TabsList className='flex items-center gap-2 bg-transparent w-full p-0'>
            {
                tabsInfo
                    .filter((tab) => isSearchedUser && tab.value !== "saved" || !isSearchedUser)
                    .map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className={`text-lg font-semibold px-8 py-5 cursor-pointer ${activeTab === tab.value ? "!bg-input !shadow-none border-none" : ""}`}
                        >
                            <tab.icon /> {tab.label}
                        </TabsTrigger>
                    ))
            }
        </TabsList>
        {
            tabsInfo.map((tab) => (
                <QueryProvider key={tab.value}>
                    <TabsContent value={tab.value}>
                        <div className='grid grid-cols-2 xs:grid-cols-3 gap-2 py-8'>
                            <ProfileTabContent tab={tab} activeTab={activeTab} 
                            userName={userName} isSearchedUser={isSearchedUser} />
                        </div>
                    </TabsContent>
                </QueryProvider>
            ))
        }
        </Tabs>
    )
}

export default ProfileTabs;