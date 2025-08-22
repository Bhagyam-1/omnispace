import { NextResponse } from "next/server";
import { signSocketToken } from "@/lib/jwt";
import { getChatUserProfile } from "@/actions/omniconnect/users/users";
import Room from "@/actions/omniconnect/room/roomModel";
import { Types } from "mongoose";

// export async function POST(req: Request, { params }: { params: { roomId: string } }) {
//   const userInfo = await getChatUserProfile(); // adapt to your auth
//   if (!userInfo) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const userId = userInfo._id?.toString();
  
//   const roomParams = await params;
//   const roomId = roomParams.roomId;

//   const room = await Room.findById(roomId);
//   if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });
//   console.log(room);
//   const members = room.members.map((memberId: Types.ObjectId) => memberId.toString());
//   if (!members.includes(userId)) {
//     return NextResponse.json({ error: "Not a member of this room" }, { status: 403 });
//   }

//   // ✅ user is part of room → issue socket token
//   const token = signSocketToken({ userId: userId || "", roomId });

//   return NextResponse.json({ token, userId });
// }

export async function POST(
  req: Request,
  context: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await context.params;

  // Now continue with your logic
  const userInfo = await getChatUserProfile();
  if (!userInfo) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = userInfo._id?.toString();

  const room = await Room.findById(roomId);
  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  const members = room.members.map((memberId: Types.ObjectId) => memberId.toString());
  if (!members.includes(userId)) {
    return NextResponse.json({ error: "Not a member of this room" }, { status: 403 });
  }

  const token = signSocketToken({ userId: userId || "", roomId });
  return NextResponse.json({ token, userId });
}
