import { FieldValue, collection, doc, documentId, increment, query, updateDoc, where } from "firebase/firestore"
import { db } from "../config/firebase"
import { findDataByQuery } from "./store"
import { AppStatisticsSchema, QuestionData } from "../utils/types"
import { getErrorStoreResponse, getSuccessStoreResponse } from "../utils/utils"

const appRef = collection(db, "app")

/* Basic CRUD methods  */

/**
 * Finds the statistics in app collection
 * @returns
 */
export async function findStatistics() {
	const q = query(appRef, where(documentId(), "==", "statistics"))
	const response = await findDataByQuery(q, AppStatisticsSchema)
	return response
}

/**
 * Updates statistics data.
 * @param data - Format as {"a.b":c}
 * @returns
 */
export async function updateStatistics(data: object) {
	try {
		const statisticsRef = doc(db, "app/statistics")
		await updateDoc(statisticsRef, data)
	} catch (e) {
		return getErrorStoreResponse(e)
	}

	return getSuccessStoreResponse([data])
}

/* Domain methods */

/**
 * Increments the number of questions by 1 for each tag.
 * Updates db statistics.
 * @param tags
 * @returns
 */
export async function updateStatisticsByQuestion(question: QuestionData) {
	const data = { "questions.quantity.total": increment(1) } as Record<string, FieldValue>

	// Increment questions quantity for each tag
	for (const tag of question.tags) {
		data[`questions.quantity.${tag}`] = increment(1)
	}

	const response = await updateStatistics(data)
	return response
}
