import { isUserNameAvailable } from "@/actions/omniconnect/users/users";
import { NextResponse } from "next/server";

export async function GET (_request: Request, {params}: {params: Promise<{userName: string}>}) {
    try {
        const user = await params;
        const userNameAvailable = await isUserNameAvailable(user.userName);
        return NextResponse.json(
            {
                available: userNameAvailable,
                message: userNameAvailable ? "User name available" : "User name not available"
            },
            { status: 200 }
        );
    } catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
