import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserI } from '@/app/connect/_utils/types';
import { checkUserNameAvailability, updateUserProfile } from '@/app/connect/_services/user-profile.service';
import UserProfileActions from './user-profile-actions';
import { Check, Pencil, Trash, X } from 'lucide-react';
import Image from 'next/image';

interface UserProfileBodyProps {
    user: UserI;
    setOpen?: (open: boolean) => void;
}

const UserProfileBody = ({user, setOpen}: UserProfileBodyProps) => {
    const [isAvailable, setIsAvailable] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [image, setImage] = useState<File | undefined>();
    const [imageUrl, setImageUrl] = useState<string | null>(user?.image);
    const imageInputRef = useRef<HTMLInputElement>(null);
    
    const [formState, setFormState] = useState({
        name: user?.name || "",
        bio: user?.bio || "",
        userName: user?.userName || ""
    });

    useEffect(() => {
        if(!formState.userName) return;

        const timer = setTimeout(async () => {
            setIsAvailable(await checkUserNameAvailability(formState.userName));
        }, 300);

        return () => clearTimeout(timer);
    }, [formState.userName]);

    const formFieldChangeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        const fieldName = e.target.id;
        
        setFormState((prev) => ({ ...prev, [fieldName]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement> | undefined) => {
        if(!e) {
            setImage(undefined);
            setImageUrl(null);
            return;
        };
        setImage(e.target.files?.[0]);
        setImageUrl(e.target.files?.[0] ? URL.createObjectURL(e.target.files?.[0]) : "");
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            setIsSubmitting(true);
            const isAvailable = await checkUserNameAvailability(formState.userName);
            setIsAvailable(isAvailable);
            setIsSubmitting(false);
            if(!isAvailable) return;

            await updateUserProfileHandler();
            setOpen?.(false);
            window.location.reload();
        } catch {
            setIsSubmitting(false);
            return;
        }
    };

    const updateUserProfileHandler = async () => {
        const formData = new FormData();
        formData.append("name", formState.name);
        formData.append("bio", formState.bio);
        formData.append("userName", formState.userName);

        const isImageChanged = user.image !== imageUrl;
        const isImageRemoved = !image && user.image;
        formData.append("imageChanged", isImageChanged.toString());
        formData.append("imageRemoved", isImageRemoved.toString());

        if(!setOpen && image) {
            formData.append("image", image);
        }

        await updateUserProfile(formData);
    }

    const handleButtonClick = () => {
        imageInputRef.current?.click();
    };
    
    return (
        <form className='flex flex-col gap-3' onSubmit={onSubmit}>
            <div className={`${!setOpen && "flex flex-col sm:flex-row gap-8 justify-between items-center"}`}>
                {
                    !setOpen && (
                        <div className='relative'>
                            <div className="relative group animate-in fade-in zoom-in-90 duration-300 flex shrink-0">
                            {
                                imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        className="rounded-full object-cover w-36 sm:w-44 md:w-56 h-36 sm:h-44 md:h-56 border-1"
                                    />
                                ) : (
                                    <Image src="/profile.jpg" alt="Preview" 
                                    width={100} height={100} 
                                    className="rounded-full object-cover w-36 md:w-56 h-36 md:h-56 border-1"/>
                                )
                            }
                            </div>
                            <button
                                type="button"
                                title="Remove Image"
                                onClick={() => handleImageChange(undefined) }
                                className="absolute bottom-4 right-2 bg-primary border-1 border-secondary rounded-full text-red-500 shadow-md hover:scale-110 transition p-2"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                title="Edit Image"
                                onClick={handleButtonClick}
                                className="absolute bottom-4 left-2 bg-primary border-1 border-secondary rounded-full text-card shadow-md hover:scale-110 transition p-2"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>
                            <input
                                title='Edit Image'
                                type="file"
                                ref={imageInputRef}
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    )
                }
                <div className={`flex flex-col gap-3 w-full ${!setOpen && "sm:w-fit"}`}>
                    <div className={`flex flex-col gap-2 ${!setOpen && "sm:min-w-72"} w-full`}>
                        <label htmlFor="name">Name*</label>
                        <Input type="text" id="name" value={formState.name} 
                        onChange={formFieldChangeHandler} required/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="userName">User Name*</label>
                        <Input type="text" id="userName" value={formState.userName} 
                        onChange={formFieldChangeHandler} required/>
                        {
                            formState.userName && 
                            (
                                isAvailable ? (
                                    <p className="flex items-center text-green-500 text-xs">
                                        <Check className="mr-1 h-4 w-4" />
                                        User name is available
                                    </p>
                                ) : (
                                    <p className="flex items-center text-red-500 text-xs">
                                        <X className="mr-1 h-4 w-4" />
                                        User name is not available
                                    </p>
                                )
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="bio">Bio</label>
                        <Textarea id="bio" value={formState.bio} 
                        onChange={formFieldChangeHandler} className='resize-none'/>
                    </div>

                </div>
            </div>
            <UserProfileActions isSubmitting={isSubmitting} setOpen={setOpen}/>
        </form>
    )
}

export default UserProfileBody;
