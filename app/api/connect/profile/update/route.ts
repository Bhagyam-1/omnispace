import { updateUserProfile } from "@/actions/omniconnect/users/users";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const body = await request.formData();
        const res = await updateUserProfile(body);
        return NextResponse.json(res);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to update user profile");
    }
}