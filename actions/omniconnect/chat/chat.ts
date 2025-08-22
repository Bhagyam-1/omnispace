"use server";

import { getChatUserProfile } from "../../profile";
import Chat, { 
    IChat,
    type IFormattedMessage,
    type IUserRef 
} from "@/actions/omniconnect/chat/chatModel";
import Room from "../room/roomModel";
import { Types } from "mongoose";

export const getChats = async (
    roomId: string, 
    page: number, 
    limit: number
): Promise<IFormattedMessage[] | null> => {
    try {
        const user = await getChatUserProfile();
        
        const room = await Room.findOne({ _id: new Types.ObjectId(roomId) }); 

        if (!room) {
            throw new Error("Room not found");
        }

        const roomMembers = room.members.map((memberId: Types.ObjectId) => memberId.toString());

        if (!roomMembers.includes(user._id.toString())) {
            throw new Error("Unauthorized: User not a member of this room");
        }

        const chats = await Chat.find({ roomId: new Types.ObjectId(roomId) })
            .populate<{ messages: Array<{ senderId: IUserRef }> }>("senderId", "name image")
            .skip((page - 1) * limit)
            .limit(limit)
            .lean() as IChat[] | null;

        if (!chats) {
            return null;
        }

        return chats.map((chat: IChat) => {
            const senderId = chat.senderId._id.toString();

            return {
                id: chat._id.toString(),
                sender: {
                    id: senderId,
                    name: (chat.senderId as IUserRef).name,
                    image: (chat.senderId as IUserRef).image
                },
                message: chat.message,
                isFriend: senderId === user._id.toString(),
                createdAt: chat.createdAt,
            }
        });
    } catch (error) {
        console.error("Error in getChats:", error);
        throw new Error("Failed to get chats");
    }
};

export const validateMessage = async (roomId: string) => {
    try {
        const room = await Room.findById(new Types.ObjectId(roomId));
        const user = await getChatUserProfile();

        if (!room) {
            throw new Error("Room not found");
        }

        const roomMembers = room.members.map((memberId: Types.ObjectId) => memberId.toString());

        if (!roomMembers.includes(user._id.toString())) {
            throw new Error("Unauthorized: User not a member of this room");
        }
    } catch (error) {
        console.error("Error in validateMessage:", error);
        throw new Error("Failed to validate message");
    }
}
