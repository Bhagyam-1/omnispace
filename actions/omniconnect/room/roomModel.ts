import { model, models, Schema } from "mongoose";

const roomSchema = new Schema({
    name: {
        type: String
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    members: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    roomImage: {
        type: String
    }
}, {
    timestamps: true
});

const Room = models.Room || model("Room", roomSchema);

export default Room;