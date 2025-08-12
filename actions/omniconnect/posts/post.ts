"use server";

import { getChatUserProfile } from "../../profile";
import cloudinary from '@/actions/configs/cloudinary';
import Post from "./postModel";
import { PostContentI, PostI } from "@/app/connect/_utils/types";
import { extractPostContent, getUserLikesFromPosts, getUserSavesFromPosts } from "./post.service";
import { getUserByUserName } from "../users/users";
import { ObjectId } from "mongoose";

export const getPosts = async () => {
    try {
        const user = await getChatUserProfile();
        const posts = await Post.find()
            .populate("userId", ["userName", "image"])
            .sort({ createdAt: -1 })
            .lean();
        
        const postIds = posts.map(post => post._id);

        const likedPostIdSet = await getUserLikesFromPosts(postIds as ObjectId[], user._id);
        const savedPostIdSet = await getUserSavesFromPosts(postIds as ObjectId[], user._id);

        const enrichedPosts = posts.map(post => {
            post.user = {
                ...post.userId,
                _id: post.userId._id.toString()
            }

            delete post.userId;
            const hasUserLiked = likedPostIdSet.has(post?._id?.toString());
            const hasUserSaved = savedPostIdSet.has(post?._id?.toString());

            return {
                _id: (post._id as ObjectId).toString(),
                content: post.content,
                likes: post.likes,
                comments: post.comments,
                user: post.user,
                hasUserLiked,
                hasUserSaved
            }
        })

        return enrichedPosts;
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Failed to fetch posts");
    }
}

export const getUserSpecificPosts = async (userName?: string) => {
    try {
        const user = await getChatUserProfile();
        let userId = user._id;

        if(userName) {
            const searchedUser = await getUserByUserName(userName);
            userId = searchedUser.user?._id || user._id;
        }
        
        const posts = await Post.find({ userId })
            .populate("userId", ["userName", "image"])
            .sort({ createdAt: -1 })
            .lean();
            
        const postIds = posts.map(post => post._id);

        const likedPostIdSet = await getUserLikesFromPosts(postIds as ObjectId[], user._id);
        const savedPostIdSet = await getUserSavesFromPosts(postIds as ObjectId[], user._id);

        const plainPosts = posts.map(post => {
            delete post.userId;
            const hasUserLiked = likedPostIdSet.has(post?._id?.toString());
            const hasUserSaved = savedPostIdSet.has(post?._id?.toString());

            return {
                ...post,
                _id: (post._id as ObjectId).toString(),
                user: {
                    ...post?.userId,
                    _id: post?.userId?._id?.toString()
                },
                userId: undefined,
                hasUserLiked,
                hasUserSaved
            }
        })

        return plainPosts;
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Failed to fetch posts");
    }
}

export const createPost = async (formData: FormData) => {
    try {
        const user = await getChatUserProfile();

        let content = await extractPostContent(formData);

        await Post.create({
            userId: user._id,
            content,
        })
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Failed to create post");
    }
}

export const updatePost = async (formData: FormData, postInfo: PostI) => {
    try {
        const user = await getChatUserProfile();
        const userId = user._id;
        
        if(postInfo.user._id.toString() !== userId.toString()) {
            throw new Error("Unauthorized: You are not authorized to update this post");
        }

        let content: PostContentI = postInfo.content;

        if(formData.get("imageRemoved") === "false" && !formData.get("image") && postInfo.content?.image) {
            content = postInfo.content;
            if(content.image) {
                content.image.caption = formData.get("text") as string;
            }
        }
        else {
            if((formData.get("imageRemoved") === "true" || formData.get("image")) && postInfo.content?.image) {
                await cloudinary.uploader.destroy(postInfo?.content?.image?.id || "");
            }
            content = await extractPostContent(formData);
        }

        await Post.findByIdAndUpdate(postInfo._id, {content});
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Failed to update post, please try again");
    }
}

export const deletePost = async (post: PostI) => {
    try {
        const user = await getChatUserProfile();
        const userId = user._id;

        if(post.user._id.toString() !== userId.toString()) {
            throw new Error("Unauthorized: You are not authorized to delete this post");
        }

        if(post.content?.image) {
            await cloudinary.uploader.destroy(post.content.image.id);
        }

        await Post.findByIdAndDelete(post._id);
    } catch (error) {
        if(error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Failed to delete post, please try again");
    }
}
