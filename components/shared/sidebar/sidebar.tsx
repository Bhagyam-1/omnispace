"use client";

import Logo from '@/components/layout/logo';
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, Sidebar } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';

const PageSidebar = ({children}: {children: React.ReactNode}) => {
    const { open, openMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant='inset' className='overflow-y-auto'>
            <SidebarContent>
                <SidebarGroup>
                    <Logo showSidebar={true} open={open || openMobile} />
                    <SidebarGroupContent>
                        <SidebarMenu className='flex flex-col gap-4'>
                            {children}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default PageSidebar;