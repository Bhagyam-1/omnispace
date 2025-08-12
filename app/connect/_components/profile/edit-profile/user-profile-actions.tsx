import React from 'react'
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface UserProfileActionsProps {
    isSubmitting: boolean;
    setOpen?: (open: boolean) => void;
}

const UserProfileActions = ({isSubmitting, setOpen}: UserProfileActionsProps) => {
    return (
        <DialogFooter className={`flex mt-8 w-full ${setOpen && "!justify-between"}`}>
            {
                setOpen && (
                    <Link href="/">
                        <Button type="button" onClick={() => setOpen(false)} className='cursor-pointer'>
                        <ArrowLeft />
                        Back to Dashboard
                        </Button>
                    </Link>
                )
            }
            {
                isSubmitting ? (
                    <Button disabled className='bg-secondary-background text-secondary-foreground hover:bg-secondary-background/80 cursor-pointer'>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                    </Button>
                ) : (
                    <Button type="submit" className='bg-secondary-background text-secondary-foreground hover:bg-secondary-background/80 cursor-pointer'>
                        Save Changes
                    </Button>
                )
            }
        </DialogFooter>
    )
}

export default UserProfileActions
