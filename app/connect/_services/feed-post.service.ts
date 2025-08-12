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