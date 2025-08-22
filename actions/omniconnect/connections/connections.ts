"use server";

import Connection from "@/actions/omniconnect/connections/connectionModel";
import { getChatUserProfile } from "../../profile";
import { Types } from "mongoose";
import Post from "@/actions/omniconnect/posts/postModel";
import { getUserByUserName } from "../users/users";
import dbConnect from "@/lib/mongodb";
import Room from "../room/roomModel";

export const getFriends = async(page: number, limit: number, search: string) => {
    const skip = (page - 1) * limit;
    const USER_SAFE_DATA = ["id", "name", "image"];
    
    try {
        const user = await getChatUserProfile();
        const userId = new Types.ObjectId(user._id);

        const friends = await Connection.find({
            $or: [
                { fromUserId: userId }, 
                { toUserId: userId }
            ],
            status: "accepted"
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        const allFriendsInfo = friends.map((friend) => {
            if(friend.fromUserId._id.toString() === user._id.toString()) {
                return {
                    id: friend.toUserId._id.toString(),
                    name: friend.toUserId.name,
                    image: friend.toUserId.image,
                    connectionId: friend._id.toString()
                };
            } 

            return {
                id: friend.fromUserId._id.toString(),
                name: friend.fromUserId.name,
                image: friend.fromUserId.image,
                connectionId: friend._id.toString()
            };
        });

        return allFriendsInfo;
    } catch (error) {
        throw new Error("Failed to fetch friends");
    }
}

export const getFriendRequests = async(page: number, limit: number, search: string) => {
    const skip = (page - 1) * limit;
    const USER_SAFE_DATA = ["id", "name", "image"];

    try {
        const user = await getChatUserProfile();
        const userId = new Types.ObjectId(user._id);

        const requests = await Connection.find({
            toUserId: userId,
            status: "pending"
        }).populate("fromUserId", USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        return requests.map((request) => {
            return {
                id: request.fromUserId._id.toString(),
                name: request.fromUserId.name,
                image: request.fromUserId.image,
                connectionId: request._id.toString()
            }
        });
    } catch (error) {
        throw new Error("Failed to fetch friend requests");
    }
}

export const sendFriendRequest = async(toUserId: string) => {
    try {
        const user = await getChatUserProfile();
        const userId = user._id;
        const toUserIdObj = new Types.ObjectId(toUserId);
        
        const existingConnection = await Connection.findOne({
            $or: [
                { fromUserId: userId, toUserId: toUserIdObj },
                { fromUserId: toUserIdObj, toUserId: userId }
            ]
        });

        if(existingConnection) {
            throw new Error("Connection already exists");
        }

        await Connection.create({
            fromUserId: userId,
            toUserId: toUserIdObj,
            status: "pending"
        });
        
        return {
            message: "Friend request sent successfully"
        };
    } catch (error) {
        throw new Error("Failed to send friend request");
    }
}

export const updateConnection = async(connectionId: string, status: string) => {
    try {
        const user = await getChatUserProfile();
        const userId = user._id;

        const allowedStatus = ["pending", "accepted", "rejected", "removed", "blocked"];

        if(!allowedStatus.includes(status)) {
            throw new Error("Invalid status");
        }

        const connection = await Connection.findOne({
            _id: new Types.ObjectId(connectionId),
            $or: [
                { fromUserId: userId }, 
                { toUserId: userId }
            ]
        });

        if(!connection) {
            throw new Error("Connection not found");
        }

        const room = await Room.findOne({
            members: {
                $all: [
                    { $elemMatch: { $eq: connection.fromUserId } },
                    { $elemMatch: { $eq: connection.toUserId } }
                ]
            }
        });

        if(
            ["rejected", "removed"].includes(status) || 
            connection.status === "blocked" && status !== "blocked"
        ) {
            
            if(room) {
                await room.deleteOne();
            }

            await connection.deleteOne();
        } else {
            connection.status = status;
            await connection.save();
        }

        if(status === "accepted" && !room) {
            await Room.create({
                members: [connection.fromUserId, connection.toUserId]
            });
        }

    } catch (error) {
        throw new Error("Failed to update connection");
    }
}

export const getAllConnections = async() => {
    try {
        const user = await getChatUserProfile();
        const userId = user._id;

        const connections = await Connection.find({
            $or: [{fromUserId: userId}, {toUserId: userId}]
        }).select("fromUserId toUserId");

        return connections;
    } catch (error) {
        throw new Error("Failed to fetch connections");
    }
}

export const getFriendsLength = async(userName: string) => {
    try {
        await dbConnect();
        const userProfile = await getUserByUserName(userName);
        const userId = new Types.ObjectId(userProfile?.user?._id);

        const friendsCount = await Connection.countDocuments({
            $or: [{fromUserId: userId}, {toUserId: userId}],
            status: "accepted"
        });

        return friendsCount;
    } catch (error) {
        throw new Error("Failed to fetch friends length");
    }
}

export const getRequestsLength = async(userName: string) => {
    try {
        await dbConnect();
        const userProfile = await getUserByUserName(userName);
        const userId = new Types.ObjectId(userProfile?.user?._id);

        const requestsCount = await Connection.countDocuments({
            toUserId: userId,
            status: "pending"
        });

        return requestsCount;
    } catch (error) {
        throw new Error("Failed to fetch requests length");
    }
}

export const getPostsLength = async(userName: string) => {
    try {
        await dbConnect();
        const userProfile = await getUserByUserName(userName);
        const userId = new Types.ObjectId(userProfile?.user?._id);

        const postsCount = await Post.countDocuments({
            userId
        });

        return postsCount;
    } catch (error) {
        throw new Error("Failed to fetch posts length");
    }
}
