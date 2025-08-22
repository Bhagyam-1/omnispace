import { models, model, Schema } from "mongoose";

const connectionSchema = new Schema({
    fromUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["pending", "accepted", "blocked", "rejected"],
            message: "{VALUE} is not a valid status"
        }
    }
}, {
    timestamps: true
});

const Connection = models.Connection || model("Connection", connectionSchema);

export default Connection;