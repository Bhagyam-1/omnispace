import { model, models, Schema, Document, Model, Types } from "mongoose";
import { IChat, IFormattedMessage, IUserRef } from "./types";

const chatSchema = new Schema<IChat>({
    roomId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    _id: true
});

// Create and export the model
const Chat = (models.Chat as Model<IChat>) || model<IChat>("Chat", chatSchema);

export type { IChat, IFormattedMessage, IUserRef };
export default Chat;