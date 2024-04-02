import { useState } from "react"
import { createQuestion } from "../../services/questions-store"
import { initializeEmptyQuestionFields, splitAndTrim } from "../../utils/utils"
import { QuestionType } from "../../utils/types"
import { QuestionBodyInput } from "./QuestionBodyInput"
import { toast } from "react-toastify"
import { Toast } from "../../components/Toast"

export const SimpleQuestionCreator = () => {
	const [title, setTitle] = useState("")
	const [body, setBody] = useState([] as string[])
	const [answers, setAnswers] = useState("")
	const [tags, setTags] = useState("")

	const handleQuestionSubmit = () => {
		const question = {
			type: QuestionType.SIMPLE,
			title,
			body,
			answers: splitAndTrim(answers),
			tags: splitAndTrim(tags),
			...initializeEmptyQuestionFields(),
		}

		createQuestion(question).then((response) => {
			if (!response.success) {
				toast.error("La question n'a pas pu être créée")
			} else {
				toast.success("La question a été créée")
			}
		})
	}

	return (
		<div className="flex flex-col space-y-4">
			<div className="form-control">
				<label className="label">
					<span className="label-text">Question</span>
				</label>
				<input className="input input-bordered" placeholder="Question" onChange={(e) => setTitle(e.target.value)} />
			</div>

			<div className="form-control">
				<label className="label">
					<span className="label-text">Corps de la question</span>
				</label>
				<QuestionBodyInput onChange={(body) => setBody(body)} />
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Réponses</span>
				</label>
				<input className="input input-bordered" placeholder="Réponses" onChange={(e) => setAnswers(e.target.value)} />
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Thèmes</span>
				</label>
				<input className="input input-bordered" placeholder="Tags" onChange={(e) => setTags(e.target.value)} />
			</div>
			<div className="form-control pt-4 self-end">
				<button className="btn btn-primary rounded-full" onClick={handleQuestionSubmit}>
					Créer question
				</button>
			</div>
			<Toast />
		</div>
	)
}
