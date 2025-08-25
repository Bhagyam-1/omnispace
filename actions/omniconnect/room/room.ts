import { getChatUserProfile } from "@/actions/profile";
import Room from "./roomModel";
import { RoomI } from "@/app/connect/_utils/types";
import { signSocketToken } from "@/lib/jwt";
import { Types } from "mongoose";

export const getRoomsList = async (page: number, limit: number, search: string): Promise<RoomI[]> => {
    const skip = (page - 1) * limit;
    try {
        const user= await getChatUserProfile();
        const userId = user._id;

        const rooms = await Room.aggregate([
            {
                $match: {
                    members: { $in: [userId] }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "members"
                }
            },
            {
                $match: {
                    "members.userName": { $regex: search || "", $options: "i" }
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $project: {
                    name: 1,
                    isGroup: 1,
                    roomImage: 1,
                    members: {
                        $map: {
                            input: "$members",
                            as: "member",
                            in: {
                                _id: "$$member._id",
                                userName: "$$member.userName",
                                image: "$$member.image"
                            }
                        }
                    }
                }
            }
        ]);

        return rooms
            .filter(room => room && room._id)
            .map((room) => {
                let name = room.name || "";
                let roomImage = room.roomImage || null;
                if(!room.isGroup) {
                    const friend = room.members.find(
                        (member: {_id: string}) => member._id.toString() !== userId.toString()
                    );
                    if(friend) {
                        name = friend.userName;
                        roomImage = friend.image;
                    }
                }
                
                return {
                    id: room._id.toString(),
                    name: name,
                    isGroup: room.isGroup,
                    members: room.members.map((member: {_id: string}) => member._id.toString()),
                    roomImage: roomImage
                };
            });
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch rooms");
    }
}

export const getUserAndTokens = async(roomId: string) => {
    try {
        const userInfo = await getChatUserProfile();
        if (!userInfo) {
            throw new Error("Unauthorized");
        }

        const userId = userInfo._id?.toString();

        const room = await Room.findById(roomId);
        if (!room) {
            throw new Error("Room not found");
        }

        const members = room.members.map((memberId: Types.ObjectId) => memberId.toString());
        if (!members.includes(userId)) {
            throw new Error("Not a member of this room");
        }

        const token = signSocketToken({ userId: userId || "", roomId });
        return { token, userId };
    } catch(error) {
        console.log(error);
        throw new Error("Failed to fetch rooms");
    }
}