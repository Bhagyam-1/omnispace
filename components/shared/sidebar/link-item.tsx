import { SidebarMenuButton } from '@/components/ui/sidebar';
import { SidebarItemI } from '@/types/sidebar';
import Link from 'next/link';

const LinkItem = ({item}: {item: SidebarItemI}) => {
  return (
    <SidebarMenuButton asChild>
        {
            item.url && <Link href={item.url!}>
                <item.icon />
                <span>{item.title}</span>
            </Link>
        }
    </SidebarMenuButton>
  )
}

export default LinkItem;