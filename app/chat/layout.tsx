import Header from '@/components/layout/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'
import PageSidebar from '../../components/shared/sidebar/sidebar';
import SidebarContent from './_components/sidebar/sidebar-content';

const ChatLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <SidebarProvider>
        <div className="flex w-full">
          <PageSidebar>
            <SidebarContent />
          </PageSidebar>
          <SidebarInset>
            <Header showSidebar={true} />
            <main className="h-full">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  )
}

export default ChatLayout;