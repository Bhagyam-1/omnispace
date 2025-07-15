"user server";

import getCurrentUser from "../profile";
import User from "../../models/user";
import dbConnect from "@/lib/mongodb";
import { getAllConnections } from "./connections";


export const getLoggedInUser = async() => {
    try {
        const user = await getCurrentUser();
        await dbConnect();

        let userInfo = await User.findOne({userId: user.id});

        if(!userInfo) {
            const newUser = await User.create({
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl,
                friendsLength: 0,
                requestsLength: 0,
                postsLength: 0
            })

            userInfo = newUser;
        }

        return userInfo;
    } catch (error) {
        throw new Error("Failed to fetch user info");
    }
}



export const getNotConnectedUsers = async(page: number, limit: number) => {
    try {
        await dbConnect();
        const allConnections = await getAllConnections();

        const hasConnections = new Set();

        allConnections.forEach((connection) => {
            hasConnections.add(connection.fromUserId);
            hasConnections.add(connection.toUserId);
        })
        
        const skip = (page - 1) * limit;

        const notConnectedUsers = await User.find({
            _id: {
                $nin: hasConnections
            }
        })
        .skip(skip)
        .limit(limit);

        return notConnectedUsers;
    } catch(error) {
        throw new Error("Failed to fetch not connected users");
    }
}
