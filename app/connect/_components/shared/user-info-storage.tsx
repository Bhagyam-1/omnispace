"use client";

import { setUserInfo } from "../../_services/storage.service";
import { UserI } from "../../_utils/types";

const UserInfoStorage = ({user}: {user: UserI}) => {
    setUserInfo(user);

    return null;
}

export default UserInfoStorage;