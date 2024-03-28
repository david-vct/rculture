import { GameData, UserInfo } from "./types"

/**
 * Get an anonymous userInfo
 * @returns UserInfo
 */
export function initializeAnonymousUserInfo(): UserInfo {
	return {
		id: "",
		name: "Anonymous",
		isAuth: false,
	}
}

export function initializeEmptyQuestionFields() {
	return {
		rating: { like: 0, dislike: 0 },
		difficulty: { win: 0, lose: 0 },
		tags: [],
	}
}

export function initializeEmptyGameData(): GameData {
	return {
		name: "XXXX",
		isSetup: false,
		users: [],
		tags: [],
		questions: [],
		questionIndex: 0,
	}
}

/**
 * Split and trim the string
 * @param str
 * @param separator
 * @returns
 */
export function splitAndTrim(str: string, separator: string) {
	return str.split(separator).map((item) => item.trim())
}
