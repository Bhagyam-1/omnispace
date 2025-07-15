import { SidebarMenuItem } from '@/components/ui/sidebar'
import React from 'react'
import { sidebarItems } from '../../_utils/config';
import LinkItem from '@/components/shared/sidebar/link-item';
import { SidebarItemI } from '@/types/sidebar';
import { Button } from '@/components/ui/button';

const renderMenuContent = (item: SidebarItemI) => {
    if (item.url) {
      return (
        <Button className="w-full my-2 px-0 hover:bg-transparent bg-transparent shadow-none text-sidebar-foreground">
          <LinkItem item={item} />
        </Button>
      )
    }
};

const SidebarContent = () => {
  return (
    sidebarItems.map((item) => (
        <SidebarMenuItem key={item.title}> 
            {renderMenuContent(item)}
        </SidebarMenuItem>
    ))
  )
}

export default SidebarContent;