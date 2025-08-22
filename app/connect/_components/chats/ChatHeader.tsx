"use client";

import Image from "next/image";
import { getChatRoomInfo } from "../../_services/storage.service";

const ChatHeader = () => {
    const room = getChatRoomInfo();

    return (
        <div className="flex gap-2 items-center p-2 md:p-4">
            {
                <Image
                    src={room?.roomImage || "/profile.jpg"}
                    alt={room?.name || "Profile Image"}
                    className='h-14 w-14 rounded-full'
                    width={56}
                    height={56}
                />
            }
            <h2 className="text-lg font-semibold">{room?.name || ""}</h2>
        </div>
    )
}

export default ChatHeader;