import { getRoomsList } from "@/actions/omniconnect/room/room";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url);

        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";

        const rooms = await getRoomsList(page, limit, search);
        return NextResponse.json(rooms);
    } catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
