import { getChatUserProfile } from "@/actions/profile";
import PostComment from "./postCommentModel";
import mongoose, { Types } from "mongoose";
import Post from "../posts/postModel";
import { fetchPostComments, validatePost, } from "./post-comment.service";

export const addCommentToPost = async (postId: string, comment: string) => {
    const session = await mongoose.startSession();
    try {
        const user = await getChatUserProfile();
        const userId = user._id;
        session.startTransaction();

        const postObjectId = new Types.ObjectId(postId);

        await PostComment.create([
            {
                userId,
                postId: postObjectId,
                comment
            }
        ], { session });

        await Post.findByIdAndUpdate(postObjectId, {
            $inc: { comments: 1 }
        }, { session });

        await session.commitTransaction();

        return {
            message: "Post commented successfully"
        };
    } catch (error) {
        console.log(error);
        
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        throw new Error("Failed to comment on post");
    } finally {
        session.endSession();
    }
}

export const getPostComments = async (postId: string) => {
    try {
        const postObjectId = new Types.ObjectId(postId);
        await validatePost(postObjectId);

        const comments = await fetchPostComments(postObjectId);
        return comments;
    } catch (error) {
        console.log(error);
        
        throw new Error("Failed to get post comments");
    }
}
