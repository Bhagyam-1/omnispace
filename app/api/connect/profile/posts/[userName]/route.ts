import { NextResponse } from 'next/server';
import { getUserSpecificPosts } from '@/actions/omniconnect/posts/post';

export const GET = async(_request: Request, {params}: {params: Promise<{userName: string}>}) => {
    try {
        const allParams = await params;
        const userName = allParams?.userName;
        const posts = await getUserSpecificPosts(userName);
        return NextResponse.json(posts);
    } catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
