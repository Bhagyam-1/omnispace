import { models, model, Schema } from "mongoose";

const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    friendsLength: {
        type: Number,
    },
    requestsLength: {
        type: Number,
    },
    postsLength: {
        type: Number,
    }
}, {
    timestamps: true
});

const User = models.User || model("User", userSchema);

export default User;