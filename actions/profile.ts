import { currentUser } from "@clerk/nextjs/server";

const getUserProfile = async() => {
    const user = await currentUser();

    if(!user) {
        throw new Error("Unauthorized: User not found");
    }

    if(!user.id) {
        throw new Error("Unauthorized: User not found");
    }
    
    return user;
}

export default getUserProfile;