import { Question } from "../../utils/types"
import { getQuestionTagValue } from "../../utils/utils"

type QuestionViewProps = {
	question: Question
	isAnswerVisible?: boolean
}

export const QuestionView = ({ question, isAnswerVisible = true }: QuestionViewProps) => {
	console.log(question)
	console.log(question.body[0])
	console.log(question.body[0].replace("\\n", "\n"))

	return (
		<div className="flex flex-col">
			<h2 className="text-2xl pb-1">{question.title}</h2>
			<div className="space-x-2 pb-4">
				{question.tags.map((tag, index) => (
					<span key={"tag-" + index} className="badge badge-outline cursor-default">
						{getQuestionTagValue(tag)}
					</span>
				))}
			</div>
			<div className="mb-4 rounded-3xl bg-accent">
				{question.body.map((text, index) => (
					<div className="m-2 p-4 bg-base-100 rounded-3xl whitespace-pre-line" key={"body-" + index}>
						{text}
					</div>
				))}
			</div>
			{isAnswerVisible && <div>{question.answers.map((answer, index) => (index === 0 ? answer : ", " + answer))}</div>}
		</div>
	)
}
