"use client";

import React, { useState } from 'react'
import { UserI } from '../../_utils/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UserProfileBody from '../profile/edit-profile/user-profile-body';

const CompleteUserProfile = ({user}: {user: UserI}) => {
    const [open, setOpen] = useState(true);

    return (
        <Dialog open={open}>
            <DialogContent className='flex flex-col gap-10'>
                <DialogHeader>
                    <DialogTitle>Complete your profile</DialogTitle>
                    <DialogDescription>
                        Please complete your profile to connect with others
                    </DialogDescription>
                </DialogHeader>
    
                <UserProfileBody
                    user={user}
                    setOpen={setOpen}
                />
                
            </DialogContent>
        </Dialog>
    );
}

export default CompleteUserProfile;
