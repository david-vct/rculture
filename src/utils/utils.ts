import { random } from "lodash"
import { GameData, GameUser, QuestionTag, StoreResponse, UserInfo } from "./types"

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
		randomIndex: createQuestionRandomIndex(),
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
		scores: {},
	}
}

export function initializeEmptyAppStatistics() {
	return {
		questions: {
			quantity: {
				total: 0,
				CULTUREG: 0,
				CULTUREP: 0,
				HISTORY: 0,
				GEOGRAPHY: 0,
				SCIENCE: 0,
				PHYSICS: 0,
				BIOLOGY: 0,
				MATHS: 0,
				SPORT: 0,
				ART: 0,
				MUSIC: 0,
				LITTERATURE: 0,
				ENIGME: 0,
				DILEMMA: 0,
			},
		},
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

export const RANDOM_INDEX_MAX = 10000
export function createQuestionRandomIndex() {
	const randomIndex = random(0, RANDOM_INDEX_MAX, false)
	return randomIndex
}

export function getQuestionTagValue(tag: string) {
	return Object.values(QuestionTag)[Object.keys(QuestionTag).indexOf(tag)]
}
