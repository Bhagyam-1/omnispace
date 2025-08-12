import { model, models, Schema } from "mongoose";

const postCommentSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    postId: {
        type: String,
        required: true,
        ref: "Post"
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

postCommentSchema.index({ userId: 1, postId: 1 }, { unique: true });
postCommentSchema.index({ postId: 1 });

const PostComment = models.PostComment || model("PostComment", postCommentSchema);

export default PostComment;