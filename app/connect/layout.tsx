import Header from '@/components/layout/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'
import PageSidebar from '../../components/shared/sidebar/sidebar';
import SidebarContent from './_components/sidebar/sidebar-content';
import { Toaster } from 'sonner';
import { getLoggedInUser } from '@/actions/omniconnect/users/users';
import CompleteUserProfile from './_components/shared/complete-user-profile';
import { getSocket } from './_utils/socket';
import UserInfoStorage from './_components/shared/user-info-storage';

const ChatLayout = async({children}: {children: React.ReactNode}) => {
  const user = await getLoggedInUser();
  if(!user) return null;

  getSocket();

  return (
    <>
      <UserInfoStorage user={user} />
      <SidebarProvider>
        <div className="flex w-full">
          <PageSidebar>
            <SidebarContent />
          </PageSidebar>
          <SidebarInset>
            <Header showSidebar={true} />
            <main className="h-full rounded-xl">
              {
                user?.userName ?
                 children :
                 <CompleteUserProfile user={user} />
              }
            </main>
            <Toaster position="top-center" richColors={true} closeButton={true} />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  )
}

export default ChatLayout;