import { Question, QuestionSchema } from "../utils/types"

export function isValideQuestion(question: Question) {
	const questionParsed = QuestionSchema.safeParse(question)
	if (!questionParsed.success) {
		console.error(questionParsed.error)
	}
	return questionParsed.success
}
