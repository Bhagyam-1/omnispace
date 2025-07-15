import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, Sidebar, SidebarTrigger } from '@/components/ui/sidebar';
import SideMenuContent from '../../../app/news/_components/shared/sidebar-menu-content';
import { SidebarItemI } from '../../../app/news/_utils/types';

const PageSidebar = ({children}: {children: React.ReactNode}) => {
  return (
    <Sidebar collapsible="icon" className='overflow-y-auto'>
        <SidebarContent>
            <SidebarGroup>
                <SidebarTrigger className='w-9 h-9 text-xl mt-4 mb-8' />
                <SidebarGroupContent>
                    <SidebarMenu>
                        {children}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
}

export default PageSidebar;