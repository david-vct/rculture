import { useState } from "react"
import { createQuestion } from "../../services/questions-store"
import { initializeEmptyQuestionFields, splitAndTrim } from "../../utils/utils"

export const SimpleQuestionCreator = () => {
	const [title, setTitle] = useState("")
	const [answers, setAnswers] = useState("")

	const createQuestionHandler = () => {
		const question = {
			title,
			answers: splitAndTrim(answers, ","),
			...initializeEmptyQuestionFields(),
		}

		createQuestion(question)
	}

	return (
		<div>
			<input
				placeholder="Question"
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				placeholder="Réponses"
				onChange={(e) => setAnswers(e.target.value)}
			/>
			<button onClick={createQuestionHandler}>Créer</button>
		</div>
	)
}
