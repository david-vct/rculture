import { Question } from "../../utils/types"
import { getQuestionTagValue } from "../../utils/utils"

type QuestionViewProps = {
	question: Question
	isAnswerVisible?: boolean
}

export const QuestionView = ({ question, isAnswerVisible = true }: QuestionViewProps) => {
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
			<div className="pb-4">
				{question.body.map((text, index) => (
					<div key={"body-" + index}>{text}</div>
				))}
			</div>
			{isAnswerVisible && <div>{question.answers.map((answer, index) => (index === 0 ? answer : ", " + answer))}</div>}
		</div>
	)
}
