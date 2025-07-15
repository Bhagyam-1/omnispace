import { model, models, Schema } from "mongoose";

const postContentSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["text", "image"]
    },
    content: {
        type: String
    },
    image: {
        type: String
    }
})

const postsSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    content: [postContentSchema],
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Post = models.Post || model("Post", postsSchema);

export default Post;
