import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import { SidebarItemI } from '../../../app/news/_utils/types'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'

const DropdownItem = ({item, searchParams}: {item: SidebarItemI, searchParams: URLSearchParams}) => {
  const router = useRouter();
  let defaultValue = searchParams.get(item.title.toLowerCase()) || item.defaultValue;

  const updateDropdownValue = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if(value === "all") {
      params.delete(item.title.toLowerCase());
    } else {
      params.set(item.title.toLowerCase(), value);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <SidebarMenuButton className="cursor-pointer">
        <item.icon />
        <span>{item.title}</span>
      </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuRadioGroup onValueChange={updateDropdownValue} value={defaultValue}>
          {
            item.dropdownItems?.map((item) => (
              <DropdownMenuRadioItem key={item.code} value={item.code}>
                <span>{item.name}</span>
              </DropdownMenuRadioItem>
            ))
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownItem;