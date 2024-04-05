import { useState } from "react"
import { createQuestion } from "../../services/questions-store"
import { initializeEmptyQuestionFields, splitAndTrim } from "../../utils/utils"
import { QuestionType } from "../../utils/types"
import { QuestionBodyInput } from "./QuestionBodyInput"
import { toast } from "react-toastify"
import { Toast } from "../../components/Toast"
import { TagSelector } from "../../components/question/TagSelector"

export const SimpleQuestionCreator = () => {
	const [title, setTitle] = useState("")
	const [body, setBody] = useState([] as string[])
	const [answers, setAnswers] = useState("")
	const [tags, setTags] = useState([] as string[])

	const handleQuestionSubmit = () => {
		// Initialize question with selected values
		const question = {
			type: QuestionType.SIMPLE,
			title,
			body,
			answers: splitAndTrim(answers),
			tags,
			...initializeEmptyQuestionFields(),
		}

		// Create the question in db
		createQuestion(question).then((response) => {
			if (!response.success) {
				toast.error("La question n'a pas pu être créée")
			} else {
				resetForm()
				toast.success("La question a été créée")
			}
		})
	}

	const handleTagChange = (tags: string[]) => {
		setTags(tags)
	}

	const resetForm = () => {
		setTitle("")
		setBody([])
		setAnswers("")
		setTags([])
	}

	return (
		<div className="flex flex-col space-y-4">
			<div className="form-control">
				<label className="label">
					<span className="label-text">Question</span>
				</label>
				<input
					className="input input-bordered rounded-full"
					placeholder="Question"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
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
				<input
					className="input input-bordered rounded-full"
					placeholder="Réponses"
					value={answers}
					onChange={(e) => setAnswers(e.target.value)}
				/>
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Thèmes</span>
				</label>
				<TagSelector onChange={(tags) => handleTagChange(tags)} />
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
