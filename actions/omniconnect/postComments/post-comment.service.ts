import PostComment from "./postCommentModel";
import Post from "../posts/postModel";
import { getChatUserProfile } from "../../profile";
import { areUsersFriends } from "../connections/connection.service";
import { Types } from "mongoose";

export const validatePost = async (postId: Types.ObjectId) => {
        const user = await getChatUserProfile();
        const userId = new Types.ObjectId(user._id);
        
        const post = await Post.findById(postId);
        
        if(!post) {
            throw new Error("Post not found");
        }

        //check if user is friend of the person or user only has added the post.
        await doesConnectionExist(post.userId, userId);
}

const doesConnectionExist = async (postUserId: Types.ObjectId, userId: Types.ObjectId) => {
    const connection = await areUsersFriends(postUserId, userId);

    if(!connection && postUserId?.toString() !== userId?.toString()) {
        throw new Error("You are not authorized to view this post");
    }
}

export const fetchPostComments = async (postId: Types.ObjectId) => {
    try {
        const comments = await PostComment.find({ postId })
            .populate("userId", ["userName", "image"])
            .sort({ createdAt: -1 })
            .lean();
        
        const plainComments = comments.map((comment) => {
            const plainComment = comment;

            plainComment.id = plainComment._id?.toString();
            plainComment.user = {
                ...plainComment.userId,
                _id: plainComment.userId?._id?.toString()
            }

            delete plainComment.userId;
            delete plainComment._id;
            
            return plainComment;
        })

        return plainComments;
    } catch (error) {
        console.log(error);
        
        throw new Error("Failed to get post comments");
    }
}
