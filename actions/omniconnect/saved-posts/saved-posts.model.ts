import { model, models, Schema } from "mongoose";

const savedPostsSchema = new Schema({
    savedUserId: {
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

savedPostsSchema.index({savedUserId: 1, postId: 1}, {unique: true});
const SavedPost = models.SavedPost || model("SavedPost", savedPostsSchema);

export default SavedPost;