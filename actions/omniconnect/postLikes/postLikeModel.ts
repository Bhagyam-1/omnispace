import { model, models, Schema } from "mongoose";

const postLikeSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    postId: {
        type: String,
        required: true,
        ref: "Post"
    }
}, {
    timestamps: true
});

postLikeSchema.index({ userId: 1, postId: 1 }, { unique: true });
postLikeSchema.index({ postId: 1 });

const PostLike = models.PostLike || model("PostLike", postLikeSchema);

export default PostLike;