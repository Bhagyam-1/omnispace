
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { SidebarItemI } from '@/types/sidebar';
import { useRouter } from 'next/navigation';

const CollapsibleItem = ({item, searchParams}: {item: SidebarItemI, searchParams: URLSearchParams}) => {
  const router = useRouter();

  const updateChildItemValue = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(item.title!.toLowerCase(), value);
    router.push(`?${params.toString()}`);
  }

  return (
      <Collapsible>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
              <item.icon />
              <span>{item.title}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.childItems?.map((childItem: SidebarItemI) => (
              <SidebarMenuSubItem key={childItem.title} >
                <SidebarMenuButton onClick={() => updateChildItemValue(childItem.code!)} value={childItem.code}>
                  <childItem.icon />
                  <span>{childItem.title}</span>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
  )
}

export default CollapsibleItem;