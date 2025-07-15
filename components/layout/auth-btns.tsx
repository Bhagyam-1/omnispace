import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

const AuthBtns = () => {
  return (
    <>
        <SignedOut>
            <SignInButton>
            <Button variant="outline" className="cursor-pointer">Sign In</Button> 
            </SignInButton>
        </SignedOut>

        <SignedIn>
        <UserButton appearance={{
            elements: {
                avatarBox: "w-10 h-10",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold",
            },
        }} />
        </SignedIn>
    </>
  )
}

export default AuthBtns
