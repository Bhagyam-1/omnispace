import { Document, Types } from 'mongoose';

export interface IUserRef {
    _id: Types.ObjectId;
    name: string;
    image?: string;
}

export interface IChat extends Document {
    _id: Types.ObjectId;
    roomId: Types.ObjectId;
    senderId: Types.ObjectId | IUserRef;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IFormattedMessage {
    id: string;
    sender: {
        id: string;
        name: string;
        image?: string;
    };
    message: string;
    createdAt?: Date;
    isFriend?: boolean;
}
