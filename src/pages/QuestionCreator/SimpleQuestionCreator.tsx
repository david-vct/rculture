import { useState } from "react"
import { createQuestion } from "../../services/questions-store"
import { initializeEmptyQuestionFields, splitAndTrim } from "../../utils/utils"
import { QuestionType } from "../../utils/types"

export const SimpleQuestionCreator = () => {
	const [title, setTitle] = useState("")
	const [answers, setAnswers] = useState("")
	const [tags, setTags] = useState("")

	const createQuestionHandler = () => {
		const question = {
			type: QuestionType.SIMPLE,
			title,
			body: [],
			answers: splitAndTrim(answers),
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
		<div className="flex flex-col space-y-4">
			<input className="input input-bordered" placeholder="Question" onChange={(e) => setTitle(e.target.value)} />
			<textarea className="textarea textarea-bordered" placeholder="Déscription"></textarea>
			<input className="input input-bordered" placeholder="Réponses" onChange={(e) => setAnswers(e.target.value)} />
			<input className="input input-bordered" placeholder="Tags" onChange={(e) => setTags(e.target.value)} />
			<button className="btn btn-primary rounded-full" onClick={createQuestionHandler}>
				Créer
			</button>
		</div>
	)
}
