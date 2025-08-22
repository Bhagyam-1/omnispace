import mongoose from "mongoose";
import Post from "../posts/postModel";
import { getChatUserProfile } from "@/actions/profile";
import PostLike from "./postLikeModel";
import { Types } from "mongoose";

export const updatePostLikes = async (postId: string, isPostLiked: boolean) => {
    const session = await mongoose.startSession();

    try {
        const user = await getChatUserProfile();
        const userId = user._id;

        const postIdObjectId = new Types.ObjectId(postId);
        session.startTransaction();

        const likedData = {
            postId: postIdObjectId,
            userId
        }

        if (isPostLiked) {
            await PostLike.create([likedData], { session });
        } else {
            await PostLike.deleteOne(likedData, { session });
        }

        await Post.findByIdAndUpdate(
            postIdObjectId,
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