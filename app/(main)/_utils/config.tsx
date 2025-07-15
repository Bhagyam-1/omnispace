import { MessageCircleMore, Newspaper, SquarePlayIcon } from "lucide-react";
import { Product } from "./types";

export const products: Product[] = [
    {
        id: 1,
        name: "OmniStream",
        description: "Dive into a world of videos. Watch trending clips, discover creators, and explore personalized recommendations — all in one place.",
        image: <SquarePlayIcon className="h-7 w-7 text-secondary-foreground" />,
        link: "/stream"
    },
    {
        id: 2,
        name: "OmniNews",
        description: "Stay ahead with the latest headlines. Get real-time updates from trusted sources across politics, tech, entertainment, and more.",
        image: <Newspaper className="h-7 w-7 text-secondary-foreground" />,
        link: "/news"
    },
    {
        id: 3,
        name: "OmniChat",
        description: "Connect seamlessly with friends and communities through fast, secure, and intuitive messaging — personal or group, all in one place.",
        image: <MessageCircleMore className="h-7 w-7 text-secondary-foreground" />,
        link: "/chat"
    }
]