"use server";

import dbConnect from "@/lib/mongodb";
import { getChatUserProfile } from "../../profile";
import crypto from "crypto";
import Chat from "@/actions/omniconnect/chat/chatModel";

const generateRoomId = (userId: string, friendId: string) => {
    const rawRoomId = [userId, friendId].sort().join('_');
    const roomId = crypto.createHmac("sha26", process.env.HMAC_SECRET || "")
                    .update(rawRoomId)
                    .digest("hex");

    return roomId;
}

export const sendMessage = async(friendId: string, newMessage: string) => {
    try {
        const user = await getChatUserProfile();

        if(!user._id) {
            throw new Error("Unauthorized: User not found");
        }

        await dbConnect();

        const roomId = generateRoomId(user._id.toString(), friendId);

        const message = {
            senderId: user._id,
            message: newMessage
        }

        const chat = await Chat.findOneAndUpdate(
            {roomId},
            {
                $setOnInsert: {
                    roomId
                },
                $push: {
                    messages: message
                }
            },
            {upsert: true, new: true}
        )
    } catch (error) {
        throw new Error("Failed to send message");
    }
}