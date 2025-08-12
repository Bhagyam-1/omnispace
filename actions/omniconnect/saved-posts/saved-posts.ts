import { getChatUserProfile } from "@/actions/profile";
import SavedPost from "./saved-posts.model";
import Post from "../posts/postModel";

export const getSavedPosts = async () => {
    try {
        const user = await getChatUserProfile();
        const savedPosts = await SavedPost.find({savedUserId: user._id})
        .populate("postId")
        .populate("savedUserId", ["userName", "image"])
        .sort({ createdAt: -1 })
        .lean();

        const plainSavedPosts = savedPosts.map(savedPost => {
            const postInfo = {
                _id: savedPost?._id?.toString(),
                ...savedPost?.postId,
                postId: savedPost?.postId?._id?.toString(),
                savedUser: {
                    ...savedPost?.savedUserId,
                    _id: savedPost?.savedUserId?._id?.toString()
                },
                savedUserId: undefined
            }

            return postInfo;
        })

        return plainSavedPosts;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch saved posts");
    }
}

export const toggleSavePost = async(postId: string) => {
    try {
        const user = await getChatUserProfile();
        const userId = user._id;

        const post = Post.findById(postId);

        if(!post) {
            throw new Error("Post not found");
        }

        const savedPost = await SavedPost.findOne({savedUserId: userId, postId});

        if(savedPost) {
            await SavedPost.findByIdAndDelete(savedPost._id);
            return {
                message: "Post removed from saved posts"
            }
        }

        await SavedPost.create({savedUserId: userId, postId});

        return {
            message: "Post saved successfully"
        }
    } catch(error) {
        console.log(error);
        throw new Error("Failed to save post");
    }
}