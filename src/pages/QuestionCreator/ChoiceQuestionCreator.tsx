import { useState } from "react"
import { createQuestion } from "../../services/store"
import { initializeEmptyQuestionFields, splitAndTrim } from "../../utils/utils"

export const ChoiceQuestionCreator = () => {
	const [title, setTitle] = useState("")
	const [choices, setChoices] = useState("")
	const [answers, setAnswers] = useState("")

	const createQuestionHandler = () => {
		const question = {
			title,
			choices: splitAndTrim(choices, ","),
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
				onChange={(e) => setChoices(e.target.value)}
			/>
			<input
				placeholder="Réponses"
				onChange={(e) => setAnswers(e.target.value)}
			/>
			<button onClick={createQuestionHandler}>Créer</button>
		</div>
	)
}
