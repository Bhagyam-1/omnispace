import { UserI } from "@/app/connect/_utils/types";

export const formatUsers = (users: any[]): UserI[] => {
    return users.map(user => ({
      _id: user._id.toString(),
      userId: user.userId,
      userName: user.userName,
      name: user.name,
      email: user.email,
      image: user.image,
      friendsLength: user.friendsLength,
      requestsLength: user.requestsLength,
      postsLength: user.postsLength,
    }));
}