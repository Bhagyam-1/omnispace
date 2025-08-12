import { model, models, Schema } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: String,
        required: true,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const chatSchema = new Schema({
    roomId: {
        type: String,
        required: true
    },
    messages: [messageSchema]
}, {
    timestamps: true
});

const Chat = models.Chat || model("Chat", chatSchema);

export default Chat;