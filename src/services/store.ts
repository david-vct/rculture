import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../config/firebase"
import { Question } from "../utils/types"
import { isValideQuestion } from "./validation"

// References to the collections
const questionsRef = collection(db, "questions")

export async function findAllQuestions() {
	try {
		const data = await getDocs(questionsRef)
		return data.docs.map((doc) => ({ ...doc.data() }))
	} catch (error) {
		console.error(error)
	}
}

export async function findQuestionById(questionId: string) {
	try {
		const q = query(questionsRef, where("id", "==", questionId))
		const data = await getDocs(q)
		console.log(data)
	} catch (error) {
		console.error(error)
	}
}

export async function findQuestionByTags(tags: string[]) {
	try {
		const q = query(questionsRef, where("id", "array-contains-any", tags))
		const data = await getDocs(q)
		console.log(data)
	} catch (error) {
		console.error(error)
	}
}

export const createQuestion = async (question: Question) => {
	if (!isValideQuestion(question)) {
		return
	}
	try {
		await addDoc(questionsRef, question)
	} catch (error) {
		console.error(error)
	}
}
