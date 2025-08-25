import { NextResponse } from "next/server";
import { getUserAndTokens } from "@/actions/omniconnect/room/room";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ roomId: string }> }      // context: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params;

    // Now continue with your logic
    const res = await getUserAndTokens(roomId);

    return NextResponse.json(res);
  } catch {
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}
