import { useState } from "react"
import { createQuestion } from "../../services/questions-store"
import { initializeEmptyQuestionFields, splitAndTrim } from "../../utils/utils"
import { QuestionType } from "../../utils/types"

export const CompleteQuestionCreator = () => {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [answers, setAnswers] = useState("")
	const [tags, setTags] = useState("")

	const createQuestionHandler = () => {
		const question = {
			type: QuestionType.COMPLETE,
			title,
			body: [description],
			answers: splitAndTrim(answers, ","),
			tags: splitAndTrim(tags),
			...initializeEmptyQuestionFields(),
		}

		createQuestion(question).then((response) => {
			if (!response.success) {
				console.error(response.error)
			} else {
				console.log(response.data)
			}
		})
	}

	return (
		<div>
			<input placeholder="Question" onChange={(e) => setTitle(e.target.value)} />
			<input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
			<input placeholder="Réponses" onChange={(e) => setAnswers(e.target.value)} />
			<input placeholder="Tags" onChange={(e) => setTags(e.target.value)} />
			<button onClick={createQuestionHandler}>Créer</button>
		</div>
	)
}
