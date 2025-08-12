import { NextResponse } from 'next/server';
import { updatePostLikes } from '@/actions/omniconnect/postLikes/postLikes';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const res = await updatePostLikes(body.postId, body.isLiked);
        return NextResponse.json(res);
    } catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Failed to update likes" }, { status: 500 });
    }
}
