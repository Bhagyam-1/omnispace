'use client';

import FriendChatCard from "./friend-chat";
import { Input } from "@/components/ui/input";
import { fetchRooms } from "@/app/connect/_services/chat.service";
import { RoomI } from "../../_utils/types";
import { useState, useRef } from "react";
import IntersectionTrigger from "@/app/news/_components/news-dashboard/intersection-trigger";
import useDebounce from "@/hooks/useDebounce";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const FriendList = ({initialRooms}: {initialRooms: RoomI[]}) => {
    const limit = 10;

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState(initialRooms);

    const lastPageRoomsLength = useRef(initialRooms.length);

    useDebounce(search, 300, () => {
        setPage(1);
        fetchNewRooms(1);
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
    }

    const fetchNewRooms = async(page: number) => {
        if(lastPageRoomsLength.current < limit) return;

        try {
            setLoading(true);
            const newRooms = await fetchRooms(page, limit, search);
            setPage((prev) => prev + 1);
            setRooms((prevRooms) => [...prevRooms, ...newRooms]);
            lastPageRoomsLength.current = newRooms.length;
        } catch {
            toast.error("Failed to fetch rooms");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col flex-1 gap-4 h-full border-r border-r-secondary md:w-fit pt-8'>
            {
                rooms.length > 0 ? (
                    <>
                        <Input
                            placeholder='Search'
                            className='mx-4 w-[calc(100%-2rem)] lg:min-w-72 md:min-w-52'
                            value={search}
                            onChange={handleSearch}
                        />
                        <nav className='flex-1 max-h-[calc(100vh-10rem)] overflow-y-auto w-full mt-4'>
                            <ul className='flex flex-col justify-center md:justify-start gap-2 w-full'>
                                {
                                    rooms?.map((room: RoomI) => (
                                        room && <FriendChatCard key={room.id} roomInfo={room} />
                                    ))
                                }
                            </ul>
                            <IntersectionTrigger onIntersect={() => fetchNewRooms(page)} />
                            {
                                loading && <Loader className="animate-spin" />
                            }
                        </nav>
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default FriendList;