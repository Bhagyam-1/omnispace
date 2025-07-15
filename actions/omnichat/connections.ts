"user server";

import Connection from "@/models/connection";
import getCurrentUser from "../profile";
import dbConnect from "@/lib/mongodb";

export const getFriends = async() => {
    const USER_SAFE_DATA = ["id", "name", "image"];
    
    try {
        const user = await getCurrentUser();
        const userId = user.id;
        
        await dbConnect();

        const friends = await Connection.find({
            $or: [{fromUserId: userId}, {toUserId: userId}],
            status: "accepted"
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        const allFriendsInfo = friends.map((friend) => {
            if(friend.fromUserId.id === user.id) {
                return friend.toUserId;
            } 

            return friend.fromUserId;
        });

        return allFriendsInfo;
    } catch (error) {
        throw new Error("Failed to fetch friends");
    }
}

export const getRequests = async() => {
    const USER_SAFE_DATA = ["id", "name", "image"];

    try {
        const user = await getCurrentUser();
        const userId = user.id;

        await dbConnect();

        const requests = await Connection.find({
            toUserId: userId,
            status: "pending"
        }).populate("fromUserId", USER_SAFE_DATA);

        return requests.map((request) => {
            return {
                userId: request.fromUserId.id,
                name: request.fromUserId.name,
                image: request.fromUserId.image
            }
        });
    } catch (error) {
        throw new Error("Failed to fetch friend requests");
    }
}

export const updateConenction = async(connectionId: string, status: string) => {
    try {
        const user = await getCurrentUser();
        const userId = user.id;

        await dbConnect();

        const allowedStatus = ["pending", "accepted", "rejected", "removed", "blocked"];

        if(!allowedStatus.includes(status)) {
            throw new Error("Invalid status");
        }

        const connection = await Connection.findOne({
            _id: connectionId,
            $or: [{fromUserId: userId}, {toUserId: userId}]
        });

        if(!connection) {
            throw new Error("Connection not found");
        }

        if(
            ["rejected", "removed"].includes(status) || 
            connection.status === "blocked" && status !== "blocked"
        ) {
            await connection.deleteOne();
            return;
        }

        connection.status = status;
        await connection.save();
    } catch (error) {
        throw new Error("Failed to update connection");
    }
}

export const getAllConnections = async() => {
    try {
        const user = await getCurrentUser();
        const userId = user.id;

        if(!userId) {
            throw new Error("Unauthorized: User not found");
        }

        await dbConnect();

        const connections = await Connection.find({
            $or: [{fromUserId: userId}, {toUserId: userId}]
        }).select("fromUserId toUserId");

        return connections;
    } catch (error) {
        throw new Error("Failed to fetch connections");
    }
}
