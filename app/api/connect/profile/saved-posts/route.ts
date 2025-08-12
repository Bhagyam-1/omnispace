import { getSavedPosts } from "@/actions/omniconnect/saved-posts/saved-posts";
import { NextResponse } from "next/server";

export const GET = async() => {
    try {
        const res = await getSavedPosts();
        return NextResponse.json(res);
    } catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}