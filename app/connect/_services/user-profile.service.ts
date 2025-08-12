import { toast } from "sonner";

export const checkUserNameAvailability = async(userName: string) => {
    const res = await fetch(`/api/connect/profile/validate-user-name/${userName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!res.ok)
        throw new Error('Failed to check user name availability');

    return await res.json().then((data: {available: boolean}) => data.available);
}

export const updateUserProfile = async(formData: FormData) => {
    const res = await fetch("/api/connect/profile/update", {
        method: "POST",
        body: formData
    })

    if(!res.ok)
        throw new Error("Failed to update user profile");

    return await res.json();
}

export const fetchPosts = async(userName: string) => {
    const res = await fetch(`/api/connect/profile/posts/${userName}`);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
}

export const fetchSavedPosts = async() => {
    const res = await fetch(`/api/connect/profile/saved-posts`);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
}

export const getPostsQueryOptions = (activeTab: string, userName?: string) => {
    if(activeTab === "posts") {
        return {
            queryKey: [activeTab, userName],
            queryFn: () => fetchPosts(userName || ""),
            staleTime: 10 * 60 * 1000,
            enabled: activeTab === "posts",
            onError: () => toast.error("Failed to fetch posts")
        }
    }

    return {
        queryKey: [activeTab],
        queryFn: () => fetchSavedPosts(),
        staleTime: 10 * 60 * 1000,
        enabled: activeTab === "saved",
        onError: () => toast.error("Failed to fetch saved posts")
    }
}