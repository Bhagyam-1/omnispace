import { getChatUserProfile } from "@/actions/profile";
import PostComment from "./postCommentModel";
import mongoose from "mongoose";
import Post from "../posts/postModel";
import { fetchPostComments, validatePost, } from "./post-comment.service";

export const updatePostComment = async (postId: string, comment: string) => {
    const session = await mongoose.startSession();
    try {
        const user = await getChatUserProfile();
        const userId = user._id;
        
        await PostComment.create([
            {
                userId,
                postId,
                comment
            }
        ], { session });

        await Post.findByIdAndUpdate(postId, {
            $inc: { commentsCount: 1 }
        }, { session });

        await session.commitTransaction();

        return {
            message: "Post commented successfully"
        };
    } catch (error) {
        console.log(error);
        session.abortTransaction();
        
        throw new Error("Failed to comment on post");
    } finally {
        session.endSession();
    }
}

export const getPostComments = async (postId: string) => {
    try {
        await validatePost(postId);

        const comments = await fetchPostComments(postId);
        return comments;
    } catch (error) {
        console.log(error);
        
        throw new Error("Failed to get post comments");
    }
}
