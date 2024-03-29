import { Query, addDoc, collection, documentId, limit, query, where } from "firebase/firestore"
import { db } from "../config/firebase"
import { Question, QuestionSchema, StoreResponse } from "../utils/types"
import { isValideQuestion } from "./validation"
import { findDataByQuery } from "./store"
import { getErrorStoreResponse, getSuccessStoreResponse } from "../utils/utils"

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

export async function createQuestion(question: Question) {
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
