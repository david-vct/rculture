import { Question } from "../../utils/types"

type QuestionViewProps = {
	question: Question
}

export const QuestionView = (props: QuestionViewProps) => {
	return (
		<div>
			<h2>{props.question.title}</h2>
			<div>
				{props.question.body.map((text) => (
					<div>{text}</div>
				))}
			</div>
			<div>{JSON.stringify(props.question.answers)}</div>
			<div>{JSON.stringify(props.question.tags)}</div>
		</div>
	)
}
