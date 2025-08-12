import { models, model, Schema } from "mongoose";

const conenctionSchema = new Schema({
    fromUserId: {
        type: String,
        required: true,
        ref: "User"
    },
    toUserId: {
        type: String,
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

const Connection = models.Connection || model("Connection", conenctionSchema);

export default Connection;