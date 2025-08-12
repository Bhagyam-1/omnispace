import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import User from "@/actions/omniconnect/users/userModel";
import { UserI } from "@/app/connect/_utils/types";

export const getUserProfile = async() => {
    const user = await currentUser();

    if(!user) {
        throw new Error("Unauthorized: User not found");
    }

    if(!user.id) {
        throw new Error("Unauthorized: User not found");
    }
    
    return user;
}

export const getChatUserProfile = async() => {
    try {
        const user = await getUserProfile();
        const userId = user.id;

        await dbConnect();
        const userChatInfo = await User.findOne({ userId }).lean<UserI>();

        if(!userChatInfo || !userChatInfo._id) {
            throw new Error("Unauthorized: User not found");
        }
        return userChatInfo;
    } catch (error) {
        throw new Error("Failed to fetch user info");
    }
}