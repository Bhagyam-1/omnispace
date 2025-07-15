import { ArrowLeft, House, MessageCircleMore, UserRound, UserRoundPlus, UsersRound } from "lucide-react";

export const sidebarItems = [
    // {
    //     title: "Back to Dashboard",
    //     icon: ArrowLeft,
    //     url: "/",
    // },
    {
        title: "Home",
        icon: House,
        url: "/chat",
    },
    {
        title: "Messages",
        icon: MessageCircleMore,
        url: "/chat/messages",
    },
    {
        title: "Friends",
        icon: UsersRound,
        url: "/chat/friends",
    },
    {
        title: "Requests",
        icon: UserRoundPlus,
        url: "/chat/requests",
    },
    {
        title: "Profile",
        icon: UserRound,
        url: "/chat/profile",
    }
]