import { NextResponse } from "next/server";
import { getPostComments, addCommentToPost } from "@/actions/omniconnect/postComments/postComments";

type Params = {
    params: Promise<{ postId: string }>
}

export const GET = async (_request: Request, {params}: Params) => {
    try {
        const { postId } = await params;
        const res = await getPostComments(postId);
        return NextResponse.json(res);
    } catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Failed to get post comments" }, { status: 500 });
    }
}

export const POST = async (req: Request, {params}: Params) => {
    try {
        const body = await req.json();
        const allParams = await params;

        const res = await addCommentToPost(allParams.postId, body.comment);
        return NextResponse.json(res);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to add comment to post");
    }
}
