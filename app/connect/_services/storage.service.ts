import { UserI, RoomI } from "../_utils/types";

/* User Info */

const USER_INFO_KEY = "userInfo";

export const setUserInfo = (user: UserI) => {
    const userInfoToStore = {
        _id: user._id,
        name: user.name,
        userName: user.userName,
        image: user.image
    };

    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfoToStore));
}

export const getUserInfo = () => {
    const userInfo = localStorage.getItem(USER_INFO_KEY);

    if(!userInfo)
        return null;

    return JSON.parse(userInfo) as UserI;
}

export const removeUserInfo = () => {
    localStorage.removeItem(USER_INFO_KEY);
}


/* Chat Room Info */

const CHAT_ROOM_INFO_KEY = "chatRoomInfo";

export const setChatRoomInfo = (room: RoomI) => {
    const chatRoomInfoToStore = {
        id: room.id,
        name: room.name,
        isGroup: room.isGroup,
        members: room.members,
        roomImage: room.roomImage
    };

    localStorage.setItem(CHAT_ROOM_INFO_KEY, JSON.stringify(chatRoomInfoToStore));
}

export const getChatRoomInfo = () => {
    const chatRoomInfo = localStorage.getItem(CHAT_ROOM_INFO_KEY);

    if(!chatRoomInfo)
        return null;

    return JSON.parse(chatRoomInfo) as RoomI;
}

export const removeChatRoomInfo = () => {
    localStorage.removeItem(CHAT_ROOM_INFO_KEY);
}
