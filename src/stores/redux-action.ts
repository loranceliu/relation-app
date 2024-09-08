import { PULL_USER_INFO } from "../constants/redux-constant";

export const pullUserInfo = (userInfo: UserInfo) => ({
    type: PULL_USER_INFO,
    payload: userInfo
});