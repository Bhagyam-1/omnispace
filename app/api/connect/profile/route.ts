import { NextResponse } from 'next/server';
import { getUserSpecificPosts } from '@/actions/omniconnect/posts/post';

export const GET = async() => {
    try {
        const posts = await getUserSpecificPosts();
        return NextResponse.json(posts);
    } catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
