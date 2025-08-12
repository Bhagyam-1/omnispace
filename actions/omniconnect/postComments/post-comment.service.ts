import PostComment from "./postCommentModel";
import Post from "../posts/postModel";
import { getChatUserProfile } from "../../profile";
import { areUsersFriends } from "../connections/connection.service";

export const validatePost = async (postId: string) => {
    const user = await getChatUserProfile();
        const post = await Post.findById(postId);
        
        if(!post) {
            throw new Error("Post not found");
        }

        //check if user is friend of the person or user only has added the post.
        await doesConnectionExist(post.userId._id, user._id);
}

const doesConnectionExist = async (postUserId: string, userId: string) => {
    const connection = await areUsersFriends(postUserId, userId);

    if(!connection && postUserId.toString() !== userId.toString()) {
        throw new Error("You are not authorized to view this post");
    }
}

export const fetchPostComments = async (postId: string) => {
    try {
        const comments = await PostComment.find({ postId }).populate("userId", ["name", "image"]).sort({ createdAt: -1 });
        const plainComments = comments.map((comment) => {
            const plainComment = comment.toObject();

            plainComment.id = plainComment._id.toString();
            plainComment.user = {
                ...plainComment.userId,
                _id: plainComment.userId._id.toString()
            }

            delete plainComment.userId;
            return plainComment;
        })

        return plainComments;
    } catch (error) {
        console.log(error);
        
        throw new Error("Failed to get post comments");
    }
}
