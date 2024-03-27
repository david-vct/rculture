import { useState } from "react"
import { createQuestion } from "../../services/store"
import { initializeEmptyQuestionFields, splitAndTrim } from "../../utils/utils"

export const CompleteQuestionCreator = () => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [answers, setAnswers] = useState("")

	const createQuestionHandler = () => {
		const question = {
			title,
			description,
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
				placeholder="Description"
				onChange={(e) => setDescription(e.target.value)}
			/>
			<input
				placeholder="Réponses"
				onChange={(e) => setAnswers(e.target.value)}
			/>
			<button onClick={createQuestionHandler}>Créer</button>
		</div>
	)
}
