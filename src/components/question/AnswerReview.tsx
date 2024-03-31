type AnswerReviewProps = {
	username: string
	answer: string
	sendIsRightAnswer: (isRight: boolean) => void
}

export const AnswerReview = (props: AnswerReviewProps) => {
	return (
		<div className="grid grid-cols-4 gap-4">
			<div className="col-span-3 align-middle self-center">{props.username + " : " + props.answer}</div>
			<div className="join join-horizontal rounded-full grow-0">
				<button className="btn btn-error join-item text-2xl" onClick={() => props.sendIsRightAnswer(false)}>
					💩
				</button>
				<button className="btn btn-success join-item text-2xl" onClick={() => props.sendIsRightAnswer(true)}>
					🥳
				</button>
			</div>
		</div>
	)
}
