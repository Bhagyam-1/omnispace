"use server";

import { getChatUserProfile, getUserProfile } from "../../profile";
import User from "./userModel";
import dbConnect from "@/lib/mongodb";
import { getAllConnections } from "../connections/connections";
import { Types } from "mongoose";
import { formatUsers } from "./users.service";
import cloudinary from "@/actions/configs/cloudinary";
import { NextResponse } from "next/server";
import { LeanSearchUser } from "./user.type";
import Connection from "../connections/connectionModel";
import { areUsersFriends } from "../connections/connection.service";


export const getLoggedInUser = async() => {
    try {
        const user = await getUserProfile();
        await dbConnect();
        let userInfo = await User.findOne({userId: user.id});
        
        const firstName = user.firstName || user.emailAddresses[0].emailAddress.split("@")[0];
        const lastName = user.lastName || "";
        const name = `${firstName} ${lastName}`;

        if(!userInfo) {
            const newUser = await User.create({
                userName: "",
                userId: user.id,
                name: name,
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl
            });

            userInfo = newUser.toObject();
        }

        return {
            _id: userInfo._id.toString(),
            userId: userInfo.userId,
            userName: userInfo.userName,
            name: userInfo.name,
            email: userInfo.email,
            image: userInfo.image,
            bio: userInfo.bio
        };
    } catch (error) {
        throw new Error("Failed to fetch user info");
    }
}

export const isUserNameAvailable = async(userName: string) => {
    try {
        const user = await getChatUserProfile();
        const userId = user._id;
        
        await dbConnect();
        const existingUser = await User.findOne({ userName, _id: { $ne: userId } });
        
        return !existingUser;
    } catch (error) {
        throw new Error("Failed to check user name availability");
    }
}

export const updateUserProfile = async(formData: FormData) => {
    try {
        const user = await getChatUserProfile();
        const userId = user._id;

        const content = {
            name: formData.get("name") as string,
            userName: formData.get("userName") as string,
            bio: formData.get("bio") as string,
            image: user.image
        }

        if(formData.get("imageRemoved") === "true") {
            await cloudinary.uploader.destroy(user.image || "");
            content.image = "";
        }
        else if(formData.get("imageChanged") === "true") {
            await cloudinary.uploader.destroy(user.image || "");

            const image = formData.get("image") as File;
            if(image instanceof File) {
                const buffer = Buffer.from(await image.arrayBuffer());

                const uploadRes: any = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        {
                            folder: "omnichat/profile"
                        },
                        (err, result) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(result);
                        }
                    ).end(buffer)
                })
                content.image = uploadRes.secure_url;
            }
        }

        await User.findByIdAndUpdate(userId, content, { new: true });
        
        return {
            message: "User profile updated successfully"
        }
    } catch (error) {
        console.log(error);
        throw new Error("Failed to update user profile");
    }
}

export const getUserByUserName = async(userName: string) => {
    try {
        const user = await getChatUserProfile();
        if(user.userName === userName) {
            user._id = user?._id?.toString();
            return { user, isLoggedInUser: true, isFriend: true };
        }

        const searchedUser = await User.findOne({ userName }).select("_id name userName image").lean<LeanSearchUser>();

        const connection = await areUsersFriends(user._id, searchedUser?._id || "");

        if(searchedUser) {
            searchedUser._id = searchedUser?._id?.toString();
            return { user: searchedUser, isLoggedInUser: false, isFriend: connection };
        }

        return { user: null, isLoggedInUser: false, isFriend: false };
    } catch (error) {
        throw new Error("Failed to fetch user by user name");
    }
}

export const getNotConnectedUsers = async(page: number, limit: number, search: string = "") => {
    try {
        const user = await getChatUserProfile();
        const userId = user._id.toString();

        await dbConnect();

        const allConnections = await getAllConnections();

        const hasConnections = new Set<string>();

        allConnections.forEach((connection) => {
            hasConnections.add(connection.fromUserId);
            hasConnections.add(connection.toUserId);
        })

        const connections = Array.from(hasConnections)
        .map((id) => new Types.ObjectId(id));
        
        const skip = (page - 1) * limit;
        
        const rawNotConnectedUsers = await User.find({
            $and: [
                { _id: { $nin: connections } },
                { userId: { $ne: userId } },
                { name: { $regex: search, $options: "i" } }
            ]
        })
        .skip(skip)
        .limit(limit)
        .lean();

        const notConnectedUsers = formatUsers(rawNotConnectedUsers);

        return notConnectedUsers;
    } catch(error) {
        throw new Error("Failed to fetch not connected users");
    }
}
