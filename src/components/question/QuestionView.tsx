import { Question } from "../../utils/types"

type QuestionViewProps = {
	question: Question
	isAnswerVisible?: boolean
}

export const QuestionView = ({ question, isAnswerVisible = true }: QuestionViewProps) => {
	return (
		<div className="flex flex-col space-y-4">
			<h2 className="text-2xl">{question.title}</h2>
			<div className="space-x-2">
				{question.tags.map((tag, index) => (
					<span key={"tag-" + index} className="badge badge-outline cursor-default">
						{tag}
					</span>
				))}
			</div>
			<div className="">
				{question.body.map((text, index) => (
					<div key={"body-" + index}>{text}</div>
				))}
			</div>
			{isAnswerVisible && <div>{question.answers.map((answer, index) => (index === 0 ? answer : ", " + answer))}</div>}
		</div>
	)
}
