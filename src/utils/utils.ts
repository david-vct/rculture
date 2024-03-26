import { UserInfo } from "./types";

/**
 * Get an anonymous userInfo
 * @returns UserInfo
 */
export function getAnonymousUserInfo():UserInfo {
    return {
        id:"",
        name:"Anonymous",
        isAuth:false
    }
}