export interface SidebarItemI {
    title: string;
    url?: string;
    icon: React.ComponentType<{ className?: string }>;
    defaultValue?: string;
    childItems?: SidebarItemI[];
    dropdownItems?: DropdownItemI[];
    code?: string;
}

export interface DropdownItemI {
    name: string;
    code: string;
}