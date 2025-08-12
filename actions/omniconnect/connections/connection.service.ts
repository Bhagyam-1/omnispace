import Connection from "./connectionModel";

export const areUsersFriends = async (userId: string, friendId: string) => {
    const connection = await Connection.findOne({
        $and: [
            { $or: [{fromUserId: userId}, {toUserId: userId}] },
            { $or: [{fromUserId: friendId}, {toUserId: friendId}] },
        ],
        status: "accepted"
    })

    return !!connection;
}