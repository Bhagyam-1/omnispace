"use client";

import React from 'react';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import CollapsibleItem from '../../../../components/shared/sidebar/collapsible-item';
import LinkItem from '../../../../components/shared/sidebar/link-item';
import DropdownItem from '../../../../components/shared/sidebar/dropdown-item';
import { useSearchParams } from 'next/navigation';
import { sidebarItems } from '../../_utils/config';
import { SidebarItemI } from '@/types/sidebar';

const SideMenuContent = () => {
  const searchParams = useSearchParams();

  const renderMenuContent = (item: SidebarItemI) => {
    if (item.childItems) {
      return <CollapsibleItem item={item} searchParams={searchParams} />;
    }
  
    if (item.url) {
      return <LinkItem item={item} />
    }

    if(item.dropdownItems) {
      return <DropdownItem item={item} searchParams={searchParams} />
    }
  };
  
  return (
    sidebarItems.map((item) => (
      <SidebarMenuItem key={item.title}> 
        {renderMenuContent(item)}
      </SidebarMenuItem>
    ))
  )
}

export default SideMenuContent;