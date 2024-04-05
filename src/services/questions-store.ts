import { Query, addDoc, collection, documentId, limit, orderBy, query, where } from "firebase/firestore"
import { db } from "../config/firebase"
import { Question, QuestionData, QuestionSchema, StoreResponse } from "../utils/types"
import { isValideQuestion } from "./validation"
import { findDataByQuery } from "./store"
import { createQuestionRandomIndex, getErrorStoreResponse, getSuccessStoreResponse } from "../utils/utils"
import { shuffle } from "lodash"

// References to the collections
const questionsRef = collection(db, "questions")

async function findQuestionByQuery(q: Query) {
	const response: StoreResponse<Question> = await findDataByQuery(q, QuestionSchema)
	return response
}

export async function findAllQuestions() {
	const q = query(questionsRef)
	const response = await findQuestionByQuery(q)
	return response
}

export async function findQuestionById(questionId: string) {
	const q = query(questionsRef, where(documentId(), "==", questionId))
	const response = await findQuestionByQuery(q)
	return response
}

export async function createQuestion(question: QuestionData) {
	if (!isValideQuestion(question)) {
		return getErrorStoreResponse("Not valide question")
	}

	const data = await addDoc(questionsRef, question)
	return getSuccessStoreResponse([data.id])
}

/* Domain methods */

export async function findQuestionByTags(tags: string[], nbQuestions: number = 10) {
	const q = query(questionsRef, where("tags", "array-contains-any", tags), limit(nbQuestions))

	const response = await findQuestionByQuery(q)
	return response
}

/**
 * Find random questions by tags
 * Based on the randomIndex field
 * @param tags
 * @param nbQuestions
 * @returns
 */
export async function findRandomQuestionsByTags(tags: string[], nbQuestions: number = 10) {
	const randomIndex = createQuestionRandomIndex()

	if (tags.length === 0) {
		return getErrorStoreResponse("Tags must not be empty")
	}

	if (nbQuestions <= 0 || nbQuestions > 30) {
		return getErrorStoreResponse("Question number must be between 1 and 30")
	}

	// First query : index bigger than randomIndex
	const response = await findQuestionByQuery(
		query(
			questionsRef,
			where("tags", "array-contains-any", tags),
			where("randomIndex", ">=", randomIndex),
			limit(nbQuestions)
		)
	)

	// Handle query fail
	if (!response.success) {
		return response
	}

	if (response.data.length < nbQuestions) {
		// Second query : index less than randomIndex
		const response2 = await findQuestionByQuery(
			query(
				questionsRef,
				where("tags", "array-contains-any", tags),
				where("randomIndex", "<", randomIndex),
				orderBy("randomIndex", "desc"),
				limit(nbQuestions - response.data.length)
			)
		)

		// Handle query fail
		if (!response2.success) {
			return response
		}

		// Merge and shuffle
		response.data = shuffle([...response.data, ...response2.data])

		if (response.data.length === 0) {
			return getErrorStoreResponse("Aucune question trouvée")
		}
	}

	return response
}
