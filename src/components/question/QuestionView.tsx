import { Question } from "../../utils/types"

type QuestionViewProps = {
	question: Question
	isAnswerVisible?: boolean
}

export const QuestionView = ({ question, isAnswerVisible = true }: QuestionViewProps) => {
	return (
		<div>
			<h2>{question.title}</h2>
			<div>
				{question.body.map((text) => (
					<div>{text}</div>
				))}
			</div>
			{isAnswerVisible && <div>{JSON.stringify(question.answers)}</div>}
			<div>{JSON.stringify(question.tags)}</div>
		</div>
	)
}
