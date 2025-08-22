import { model, models, Schema } from "mongoose";

const postCommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    postId: {
        type: Schema.Types.ObjectId,
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

postCommentSchema.index({ userId: 1, postId: 1 });
postCommentSchema.index({ postId: 1 });

const PostComment = models.PostComment || model("PostComment", postCommentSchema);

export default PostComment;