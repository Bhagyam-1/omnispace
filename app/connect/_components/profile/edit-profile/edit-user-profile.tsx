"use client";

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import UserProfileBody from './user-profile-body';
import { UserI } from '@/app/connect/_utils/types';
import { Button } from '@/components/ui/button';

const EditUserProfile = ({user}: {user: UserI}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='w-full cursor-pointer'>
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col gap-10 w-full !max-w-[80%] xs:!max-w-[60%] lg:!max-w-[50%]'>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Please update your profile
                    </DialogDescription>
                </DialogHeader>
    
                <UserProfileBody
                    user={user}
                />
                
            </DialogContent>
        </Dialog>
    );
}

export default EditUserProfile;