import { toggleSavePost } from "@/actions/omniconnect/saved-posts/saved-posts"
import { NextResponse } from "next/server";

export const GET = async (_req: Request, {params}: {params: Promise<{postId: string}>}) => {
    try {
        const allParams = await params;
        const res = await toggleSavePost(allParams.postId);
        return NextResponse.json(res);
    } catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
    }
}
