"use client";

import { SidebarMenuItem } from '@/components/ui/sidebar'
import React from 'react'
import { sidebarItems } from '../../_utils/config';
import LinkItem from '@/components/shared/sidebar/link-item';
import { SidebarItemI } from '@/types/sidebar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useSidebar } from '@/components/ui/sidebar';

const renderMenuContent = (item: SidebarItemI, open: boolean) => {
    if (item.url) {
      return (
        <Button asChild className="w-full my-2 px-0 py-4 hover:bg-transparent bg-transparent shadow-none text-sidebar-foreground">
          <LinkItem item={item} />
        </Button>
      )
    }
    if (item.content) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className={`flex items-center justify-start !p-[6px] w-full h-8 rounded-md hover:bg-sidebar-accent bg-transparent shadow-none text-sidebar-foreground cursor-pointer`}
            >
              <item.icon className="!h-4 !w-4" />
              <span className={`truncate ${!open && "opacity-0"} transition-opacity`}> {item.title} </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            {item.content}
          </DialogContent>
        </Dialog>
      );
    }
};

const SidebarContent = () => {
  const { open, openMobile } = useSidebar();

  return (
    sidebarItems.map((item) => (
        <SidebarMenuItem key={item.title}> 
            {renderMenuContent(item, open || openMobile)}
        </SidebarMenuItem>
    ))
  )
}

export default SidebarContent;