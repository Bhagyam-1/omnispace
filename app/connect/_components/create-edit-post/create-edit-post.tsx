"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { createPost, updatePost } from "@/actions/omniconnect/posts/post";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import UploadDropzone from "./upload-dropzone";
import { PostI } from "../../_utils/types";

interface CreateEditPostProps {
    isNewPost?: boolean;
    postInfo?: PostI;
    onUpdatePost?: () => void;
}

const CreateEditPost = ({isNewPost = true, postInfo, onUpdatePost}: CreateEditPostProps) => {
    const [image, setImage] = useState<File | undefined>();
    const [text, setText] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (postInfo?.content?.type === "image") {
            setText(postInfo.content?.image?.caption || "");
            setImageUrl(postInfo.content?.image?.url || "");
        } else if (postInfo?.content?.type === "text") {
            setText(postInfo.content?.text || "");
        }
    }, [postInfo]);

    const handleFileChange = (file: File | undefined) => {
        setImage(file);
        setImageUrl(file ? URL.createObjectURL(file) : "");
    };

    const postHandler = async() => {
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }

        formData.append("text", text);
        
        const imageRemoved = (!image && !imageUrl && postInfo?.content?.image?.url) as boolean;
        formData.append("imageRemoved", imageRemoved?.toString());

        if(isNewPost) {
            await createNewPost(formData);
        } else {
            await updatePostHandler(formData);
        }
    }

    const createNewPost = async (formData: FormData) => {
        try {
            setLoading(true);
            await createPost(formData);
            toast.success("Post created successfully");
            resetState();
        } catch (err) {
            if(err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to create post, please try again");
            }
        } finally {
            setLoading(false);
        }
    }

    const updatePostHandler = async (formData: FormData) => {
        try {
            setLoading(true);
            await updatePost(formData, postInfo as PostI);
            toast.success("Post updated successfully");
            resetState();
            onUpdatePost?.();
        } catch (err) {
            if(err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to update post, please try again");
            }
        } finally {
            setLoading(false);
        }
    }

    const resetState = () => {
        setImage(undefined);
        setImageUrl("");
        setText("");
    }

    const isPostUpdated = () => {
        const content = text || image;
        const isLoading = loading;

        if(!content) {
            return false;
        }
    
        if (isNewPost) {
            return content && !isLoading;
        }
    
        const originalCaption = postInfo?.content?.image?.caption || "";
        const originalText = postInfo?.content?.text || "";
        const originalImageUrl = postInfo?.content?.image?.url || "";
    
        const hasTextChanged = text !== originalCaption && text !== originalText;
        const hasImageChanged = imageUrl !== originalImageUrl;
    
        return !isLoading && (hasTextChanged || hasImageChanged);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setText(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === " " || e.key === "Enter") {
            e.stopPropagation();
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-4 animate-in fade-in duration-300">
            { isNewPost && <h2 className="text-2xl font-semibold">Create a Post</h2> }
            {
                imageUrl ? (
                    <div className="relative group animate-in fade-in zoom-in-90 duration-300">
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-full rounded-lg object-cover h-96 md:h-88 border-1"
                        />
                        <button title="Remove Image"
                            onClick={() => handleFileChange(undefined) }
                            className="absolute top-2 right-2 p-1 bg-white rounded-full text-red-500 shadow-md hover:scale-110 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <UploadDropzone onFileAccepted={handleFileChange} />
                )
            }

            <Textarea
                placeholder="What's on your mind?"
                className="h-32 resize-none focus:ring-2 focus:ring-primary transition-all"
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
            />

            <Button
                onClick={postHandler}
                disabled={!isPostUpdated()}
                className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
                {loading ? 
                    isNewPost ? "Creating..." : "Updating..." : 
                    isNewPost ? "Create Post" : "Update Post"
                }
                {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
        </div>
    )
}

export default CreateEditPost;
