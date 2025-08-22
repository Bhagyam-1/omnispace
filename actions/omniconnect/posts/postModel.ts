import { model, models, Schema } from "mongoose";

const postContentSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["text", "image"]
    },
    text: {
        type: String,
        default: ""
    },
    image: {
        url: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            default: ""
        },
        caption: {
            type: String,
            default: ""
        }
    }
}, { _id: false });

const postsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    content: {
        type: postContentSchema,
        required: true
    },
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
