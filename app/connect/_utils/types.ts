export interface FriendI {
    id: number;
    userName: string;
    image: string;
    connectionId: string;
}

export interface FriendRequestI {
    id: number;
    userName: string;
    image: string;
    connectionId: string;
}

export interface UserI {
    _id: string,
    userId?: string,
    userName: string,
    name: string,
    bio?: string,
    email?: string,
    image: string,
}

// export type SearchedUserI = Omit<UserI, "userId">;

export type TabValue = "posts" | "saved";

export type TabInfo = {
    value: TabValue;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    noDataMessage?: string;
    noDataIcon?: React.ComponentType<{ className?: string }>;
}

export interface PostI {
    _id: string;
    content: PostContentI;
    likes: number;
    comments: number;
    user: UserI;
    hasUserLiked: boolean;
    hasUserSaved: boolean;
}

export interface PostContentI {
    type: PostType;
    image?: PostImageI;
    text?: string;
}

export interface PostImageI {
    url: string;
    id: string;
    caption: string;
}

export interface CommentsI {
    id: string;
    user: UserI;
    postId: string;
    comment: string;
}

export enum PostType {
    TEXT = "text",
    IMAGE = "image"
}

export interface RoomI {
    id: string;
    name: string;
    isGroup: boolean;
    members: string[];
    roomImage?: string;
}

export interface IFormattedMessage {
    id: string;
    sender: {
        id: string;
        userName: string;
        image?: string;
    };
    message: string;
    createdAt?: Date;
    isFriend?: boolean;
}