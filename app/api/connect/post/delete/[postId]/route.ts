import { deletePost } from "@/actions/omniconnect/posts/post";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, { params }: { params: Promise<{ postId: string }> }) => {
    try {
        const allParams = await params;
        const postId = allParams.postId;
        await deletePost(postId);
        return NextResponse.json({ message: "Post deleted successfully" });
    } catch {
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
};