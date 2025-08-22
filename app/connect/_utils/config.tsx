import { Bookmark, Grid2X2Plus, MessageCircleMore, Search, UserRound, UserRoundPlus, UsersRound, ImagePlus, Film, Grid2X2X, BookmarkX } from "lucide-react";
import { TabInfo } from "./types";
import { SidebarItemI } from "@/types/sidebar";
import SearchContent from "../_components/search/search-content";

export const sidebarItems: SidebarItemI[] = [
    {
        title: "Feed",
        icon: Film,
        url: "/connect",
    },
    {
        title: "Search",
        icon: Search,
        content: <SearchContent />
    },
    {
        title: "Chats",
        icon: MessageCircleMore,
        url: "/connect/chats",
    },
    {
        title: "Friends",
        icon: UsersRound,
        url: "/connect/friends",
    },
    {
        title: "Requests",
        icon: UserRoundPlus,
        url: "/connect/requests",
    },
    {
        title: "Create",
        icon: ImagePlus,
        url: "/connect/create",
    },
    {
        title: "Profile",
        icon: UserRound,
        url: "/connect/profile",
    }
];

export const tabsInfo: TabInfo[] = [
    { value: "posts", label: "Posts", icon: Grid2X2Plus, noDataMessage: "No post created", noDataIcon: Grid2X2X },
    { value: "saved", label: "Saved", icon: Bookmark, noDataMessage: "No saved posts found", noDataIcon: BookmarkX }
]