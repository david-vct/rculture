import { GameData, GameUser, StoreResponse, UserInfo } from "./types"

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
	}
}

export function initializeEmptyGameData(): GameData {
	return {
		name: "XXXX",
		isSetup: false,
		users: {},
		tags: [],
		questions: [],
		questionIndex: 0,
	}
}

export function initializeGameUser(name: string): GameUser {
	return {
		name,
		answers: {},
		reviews: {},
	}
}

export function initializeEmptyQuestionData() {}

export function getSuccessStoreResponse<DataType>(data: DataType[]): StoreResponse<DataType> {
	return {
		success: true,
		data,
	}
}

export function getErrorStoreResponse<DataType>(error: unknown): StoreResponse<DataType> {
	return {
		success: false,
		error,
	}
}

/**
 * Split and trim the string
 * @param str
 * @param separator
 * @returns
 */
export function splitAndTrim(str: string, separator: string = ",") {
	return str.split(separator).map((item) => item.trim())
}
