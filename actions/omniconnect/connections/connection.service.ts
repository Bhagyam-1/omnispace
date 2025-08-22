import { Types } from "mongoose";
import Connection from "./connectionModel";

export const areUsersFriends = async (userId: Types.ObjectId, friendId: Types.ObjectId) => {
    const connection = await Connection.findOne({
        $and: [
            { $or: [{fromUserId: userId}, {toUserId: userId}] },
            { $or: [{fromUserId: friendId}, {toUserId: friendId}] },
        ],
        status: "accepted"
    })

    return !!connection;
}