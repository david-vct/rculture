import { Query, addDoc, collection, query, where } from "firebase/firestore"
import { db } from "../config/firebase"
import { Question, QuestionSchema } from "../utils/types"
import { isValideQuestion } from "./validation"
import { findDataByQuery } from "./store"

// References to the collections
const questionsRef = collection(db, "questions")

async function findQuestionByQuery(q: Query) {
	const questions = await findDataByQuery(q, QuestionSchema)
	return questions
}

export async function findAllQuestions() {
	const q = query(questionsRef)
	const data = await findQuestionByQuery(q)
	return data
}

export async function findQuestionById(questionId: string) {
	const q = query(questionsRef, where("id", "==", questionId))
	const data = await findQuestionByQuery(q)
	return data
}

export async function findQuestionByTags(tags: string[]) {
	const q = query(questionsRef, where("tags", "array-contains-any", tags))
	const data = await findQuestionByQuery(q)
	return data
}

export const createQuestion = async (question: Question) => {
	if (!isValideQuestion(question)) {
		return
	}

	const data = await addDoc(questionsRef, question)
	return data.id
}
