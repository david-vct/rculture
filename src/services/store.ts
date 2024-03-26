import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Question } from "../utils/types";

// References to the collections
const questionsCollectionRef = collection(db, "questions")

export const findAllQuestionsCopy = async () => {
    try {
        const data = await getDocs(questionsCollectionRef)
        return data.docs.map((doc) => ({...doc.data()}))
    } catch (error) {
        console.error(error)
    }
}

export async function findAllQuestions() {
    try {
        const data = await getDocs(questionsCollectionRef)
        return data.docs.map((doc) => ({...doc.data()}))
    } catch (error) {
        console.error(error)
    }
}

export async function findQuestionById() {
    // TODO
}

export const createQuestion = async (question:Question) => {
    try {
        await addDoc(questionsCollectionRef, question)
    } catch (error) {
        console.error(error)
    }
}