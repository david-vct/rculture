import {
	Query,
	QuerySnapshot,
	addDoc,
	collection,
	doc,
	documentId,
	onSnapshot,
	query,
	updateDoc,
	where,
} from "firebase/firestore"
import { db } from "../config/firebase"
import {
	getErrorStoreResponse,
	getSuccessStoreResponse,
	initializeEmptyGameData,
	initializeGameUser,
} from "../utils/utils"
import { findDataByQuery } from "./store"
import { Game, GameSchema, StoreResponse, UserInfo } from "../utils/types"
import { validateStoreResponseLength } from "./validation"
import { findQuestionByTags } from "./questions-store"

const gamesRef = collection(db, "games")

/* Basic CRUD methods  */

async function findGameByQuery(q: Query) {
	const response: StoreResponse<Game> = await findDataByQuery(q, GameSchema)
	return response
}

export async function findAllGames() {
	const q = query(gamesRef)
	const games = await findGameByQuery(q)
	return games
}

export async function findGameById(id: string) {
	const q = query(gamesRef, where(documentId(), "==", id))
	let response = await findGameByQuery(q)

	response = validateStoreResponseLength(response, 1)
	return response
}

export async function createGame() {
	const newGame = initializeEmptyGameData()
	const gameRef = await addDoc(gamesRef, newGame)
	return gameRef.id
}

/**
 * Update data from an existing game
 * @param id - Game id
 * @param data - Object on filepath format ["a.b":c]
 * @returns
 */
export async function updateGame(id: string, data: object): Promise<StoreResponse<Game>> {
	// Verify game existance
	if (!(await existsGameById(id))) {
		return getErrorStoreResponse(`Game ${id} does not exist`)
	}
	// Update game data
	console.log(`Update Game : ${id} ${data}`)
	const gameRef = doc(db, `games/${id}`)
	await updateDoc(gameRef, data)
	return getSuccessStoreResponse([])
}

/**
 * Verify game existance by fetching from db
 * @param id
 * @returns
 */
export async function existsGameById(id: string) {
	const response = await findGameById(id)
	return response.success
}

/* Domain methods */

/**
 * Starts game by finishing the setup
 * @param id
 * @returns
 */
export async function startGame(id: string, tags: string[], nbQuestions: number) {
	const questionResponse = await findQuestionByTags(tags, nbQuestions)
	if (!questionResponse.success) {
		return questionResponse
	}

	const data = {
		["isSetup"]: true,
		["questions"]: questionResponse.data,
	}

	const response = await updateGame(id, data)
	return response
}

export async function addPlayerToGame(gameId: string, userInfo: UserInfo) {
	const gameUser = initializeGameUser(userInfo.name)
	const response = await updateGame(gameId, { ["users." + userInfo.id]: gameUser })
	return response
}

export async function updateGameUserAnswers(gameId: string, userId: string, answers: Record<string, string>) {
	const response = await updateGame(gameId, { ["users." + userId + ".answers"]: answers })
	return response
}

export function listenGame(id: string, callback: (snapshot: QuerySnapshot) => void) {
	const q = query(gamesRef, where(documentId(), "==", id))
	return onSnapshot(q, callback)
}
