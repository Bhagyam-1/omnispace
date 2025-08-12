export interface SidebarItemI {
    icon: React.ComponentType<{ className?: string }>;
    title?: string;
    url?: string;
    content?: React.ReactNode;
    defaultValue?: string;
    childItems?: SidebarItemI[];
    dropdownItems?: DropdownItemI[];
    code?: string;
}

export interface DropdownItemI {
    name: string;
    code: string;
}