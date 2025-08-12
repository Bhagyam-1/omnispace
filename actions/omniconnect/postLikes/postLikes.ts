import mongoose from "mongoose";
import Post from "../posts/postModel";
import { getChatUserProfile } from "@/actions/profile";
import PostLike from "./postLikeModel";

export const updatePostLikes = async (postId: string, isPostLiked: boolean) => {
    console.log(postId, isPostLiked);
    const session = await mongoose.startSession();
    try {
        const user = await getChatUserProfile();
        session.startTransaction();

        const likedData = {
            postId,
            userId: user._id.toString()
        }
        
        if (isPostLiked) {
            await PostLike.create([likedData], { session });
        } else {
            await PostLike.deleteOne(likedData, { session });
        }
        
        await Post.findByIdAndUpdate(
            postId,
            [
                {
                    $set: {
                        likes: {
                            $cond: [
                                { $eq: [isPostLiked, true] },
                                { $add: ["$likes", 1] },
                                {
                                    $cond: [
                                        { $gt: ["$likes", 0] },
                                        { $add: ["$likes", -1] },
                                        0
                                    ]
                                }
                            ]
                        }
                    }
                }
            ],
            { session }
        );        

        await session.commitTransaction();

        return {
            message: "Post liked successfully"
        };
    } catch (error) {
        console.log(error);

        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        throw new Error("Failed to like post");
    } finally {
        session.endSession();
    }
}