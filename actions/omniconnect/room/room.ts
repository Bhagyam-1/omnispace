import { getChatUserProfile } from "@/actions/profile";
import Room from "./roomModel";
import { Types } from "mongoose";

export const getRoomsList = async (page: number, limit: number, search: string) => {
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
                $skip: skip
            },
            {
                $limit: limit
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
                                name: "$$member.name",
                                image: "$$member.image"
                            }
                        }
                    }
                }
            }
        ]);

        return rooms.map((room) => {
            if(room && room._id) {
                let name = room.name || "";
                let roomImage = room.roomImage || null;
                if(!room.isGroup) {
                    const friend = room.members.find(
                        (member: {_id: string}) => member._id.toString() !== userId.toString()
                    );
                    if(friend) {
                        name = friend.name;
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
            }
        });
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch rooms");
    }
}
