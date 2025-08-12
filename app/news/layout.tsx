import Header from '@/components/layout/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React, { Suspense } from 'react'
import PageSidebar from '../../components/shared/sidebar/sidebar';
import SideMenuContent from './_components/shared/sidebar-menu-content';
import { Skeleton } from '@/components/ui/skeleton';

const NewsLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <SidebarProvider>
        <div className="flex w-full">
          <PageSidebar>
            <Suspense fallback={<Skeleton />}>
              <SideMenuContent />
            </Suspense>
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