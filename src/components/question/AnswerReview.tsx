type AnswerReviewProps = {
	username: string
	answer: string
	sendIsRightAnswer: (isRight: boolean) => void
}

export const AnswerReview = (props: AnswerReviewProps) => {
	return (
		<div>
			<div>{props.username}</div>
			<div>{props.answer}</div>
			<button onClick={() => props.sendIsRightAnswer(true)}>Right</button>
			<button onClick={() => props.sendIsRightAnswer(false)}>Wrong</button>
		</div>
	)
}
