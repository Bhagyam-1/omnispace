export const updateLikes = async(postId: string, isLiked: boolean) => {
    const res = await fetch("/api/connect/post/likes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            postId,
            isLiked
        })
    })

    if(!res.ok)
        throw new Error('Failed to update like');
}

export const createCommentQueryOptions = (open: boolean, postId: string) => {
    return {
        queryKey: ["comments", postId],
        queryFn: () => getComments(postId),
        enabled: open,
        staleTime: 30000,
        gcTime: 30000
    }
}

export const getComments = async(postId: string) => {
    const res = await fetch(`/api/connect/post/${postId}/comments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!res.ok)
        throw new Error('Failed to get comments');

    return await res.json();
}

export const addCommentHandler = async(postId: string, comment: string) => {
    const res = await fetch(`/api/connect/post/${postId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comment
        })
    })

    if(!res.ok)
        throw new Error('Failed to add comment to post');
}

export const toggleSavePostStatus = async(postId: string) => {
    const res = await fetch(`/api/connect/post/save/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!res.ok)
        throw new Error('Failed to toggle save post');

    return await res.json();
}