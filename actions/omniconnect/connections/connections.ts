"use server";

import Connection from "@/actions/omniconnect/connections/connectionModel";
import { getChatUserProfile } from "../../profile";
import { startSession, Types } from "mongoose";
import User from "@/actions/omniconnect/users/userModel";
import Post from "@/actions/omniconnect/posts/postModel";
import { getUserByUserName } from "../users/users";
import dbConnect from "@/lib/mongodb";

export const getFriends = async(page: number, limit: number, search: string) => {
    const skip = (page - 1) * limit;
    const USER_SAFE_DATA = ["id", "name", "image"];
    
    try {
        const user = await getChatUserProfile();
        const userId = user._id;

        const friends = await Connection.find({
            $or: [{fromUserId: userId}, {toUserId: userId}],
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
        const userId = user._id;

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
    const session = await startSession();
    
    try {
        session.startTransaction();

        const user = await getChatUserProfile();
        const userId = user._id;

        const existingConnection = await Connection.findOne({
            $and:[
                { $or: [{fromUserId: toUserId}, {toUserId: userId}] }, 
                { $or: [{fromUserId: userId}, {toUserId: toUserId}] }
            ]
        })

        if(existingConnection) {
            throw new Error("Connection already exists");
        }

        await Connection.create({
            fromUserId: userId,
            toUserId,
            status: "pending"
        });

        const friendRequestsCount = await Connection.countDocuments({
            toUserId: userId,
            status: "pending"
        }).session(session);

        await User.updateOne(
            { userId },
            {
                requestsLength: friendRequestsCount
            }
        ).session(session);
        
        await session.commitTransaction();
        return {
            message: "Friend request sent successfully"
        };
    } catch (error) {
        session.abortTransaction();
        throw new Error("Failed to send friend request");
    } finally {
        session.endSession();
    }
}

export const updateConnection = async(connectionId: string, status: string) => {
    const session = await startSession();

    try {
        session.startTransaction();

        const user = await getChatUserProfile();
        const userId = user._id;

        const allowedStatus = ["pending", "accepted", "rejected", "removed", "blocked"];

        if(!allowedStatus.includes(status)) {
            throw new Error("Invalid status");
        }

        const connection = await Connection.findOne({
            _id: new Types.ObjectId(connectionId),
            $or: [{fromUserId: userId}, {toUserId: userId}]
        }).session(session);

        if(!connection) {
            throw new Error("Connection not found");
        }

        if(
            ["rejected", "removed"].includes(status) || 
            connection.status === "blocked" && status !== "blocked"
        ) {
            await connection.deleteOne({ session });
        } else {
            connection.status = status;
            await connection.save({ session });
        }

        const friendRequestsCount = await Connection.countDocuments({
            toUserId: userId,
            status: "pending"
        }).session(session);

        const friendsCount = await Connection.countDocuments({
            $or: [{fromUserId: userId}, {toUserId: userId}],
            status: "accepted"
        }).session(session);

        await User.updateOne(
            { userId },
            {
                requestsLength: friendRequestsCount,
                friendsLength: friendsCount
            }
        ).session(session);

        await session.commitTransaction();
    } catch (error) {
        session.abortTransaction();
        throw new Error("Failed to update connection");
    } finally {
        session.endSession();
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
