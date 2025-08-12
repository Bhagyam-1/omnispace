import cloudinary from '@/actions/configs/cloudinary';
import { PostContentI, PostType } from '@/app/connect/_utils/types';
import PostLike from '../postLikes/postLikeModel';
import { ObjectId } from 'mongoose';
import SavedPost from '../saved-posts/saved-posts.model';

export const extractPostContent = async (formData: FormData): Promise<PostContentI> => {
    const image = formData.get("image") as File | null;
    const text = formData.get("text") as string | null;

    if(image) {
        return await setImagePost(image, text || "");
    }
    
    return await setTextPost(text || "");
}

const setImagePost = async (image: File, text: string): Promise<PostContentI> => {
    const buffer = Buffer.from(await image.arrayBuffer());

    const uploadRes: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "omnichat/posts"
            },
            (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            }
        ).end(buffer)
    })

    return {
        type: PostType.IMAGE,
        image: {
            url: uploadRes.secure_url,
            id: uploadRes.public_id,
            caption: text,
        }
    }
}

export const setTextPost = async (text: string): Promise<PostContentI> => {
    return {
        type: PostType.TEXT,
        text,
    }
}

export const getUserLikesFromPosts = async (postIds: ObjectId[], userId: string) => {
    const userLikes = await PostLike.find({ 
        userId: userId, 
        postId: { $in: postIds }
    }).lean();
    
    const likedPostIdSet = new Set(userLikes.map(like => like.postId.toString()));

    return likedPostIdSet;
}

export const getUserSavesFromPosts = async (postIds: ObjectId[], userId: string) => {
    const userSaves = await SavedPost.find({
        savedUserId: userId,
        postId: { $in: postIds }
    }).lean();

    const savedIdSet = new Set(userSaves.map(save => save.postId.toString()));

    return savedIdSet;
}