import {
	Query,
	QuerySnapshot,
	addDoc,
	collection,
	doc,
	documentId,
	onSnapshot,
	query,
	setDoc,
	where,
} from "firebase/firestore"
import { db } from "../config/firebase"
import { initializeEmptyGameData } from "../utils/utils"
import { findDataByQuery } from "./store"
import { Game, GameSchema, StoreResponse } from "../utils/types"

const gamesRef = collection(db, "games")

/* Basic CRUD methods  */

async function findGameByQuery(q: Query) {
	const games: StoreResponse<Game> = await findDataByQuery(q, GameSchema)
	return games
}

export async function findAllGames() {
	const q = query(gamesRef)
	const games = await findGameByQuery(q)
	return games
}

export async function findGameById(gameId: string) {
	const q = query(gamesRef, where("gameId", "==", gameId))
	const games = await findGameByQuery(q)
	return games
}

export async function createGame() {
	const newGame = initializeEmptyGameData()
	const gameRef = await addDoc(gamesRef, newGame)
	return gameRef.id
}

export async function updateGame(gameId: string, tags: string[]) {
	const gameRef = doc(db, `games/${gameId}`)
	const data = await setDoc(gameRef, { tags }, { merge: true })
	return data
}

/* Domain methods */

export async function startGame(gameId: string) {
	const gameRef = doc(db, `games/${gameId}`)
	const data = await setDoc(gameRef, { isSetup: true }, { merge: true })
	return data
}

export async function listenGame(gameId: string, callback: (snapshot: QuerySnapshot) => void) {
	const q = query(gamesRef, where(documentId(), "==", gameId))
	onSnapshot(q, callback)
}
