import Header from '@/components/layout/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'
import PageSidebar from '../../components/shared/sidebar/sidebar';
import SideMenuContent from './_components/shared/sidebar-menu-content';

const NewsLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <SidebarProvider>
        <div className="flex w-full">
          <PageSidebar>
            <SideMenuContent />
          </PageSidebar>
          <SidebarInset>
            <Header showSidebar={true} />
            <main className="flex mx-10 gap-12">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  )
}

export default NewsLayout;