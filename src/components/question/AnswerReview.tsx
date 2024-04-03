import { useEffect, useState } from "react"

type AnswerReviewProps = {
	username: string
	answer: string
	isRight: boolean
	onChange: (isRight: boolean) => void
}

export const AnswerReview = (props: AnswerReviewProps) => {
	const [isRight, setIsRight] = useState(props.isRight)

	const handleClick = (isRight: boolean) => {
		setIsRight(isRight)
		props.onChange(isRight)
	}

	useEffect(() => {
		setIsRight(props.isRight)
	}, [props.isRight])

	return (
		<div className="grid grid-cols-4 gap-4">
			<div className="col-span-3 align-middle self-center">{props.username + " : " + props.answer}</div>
			<div className="join join-horizontal rounded-full grow-0">
				<button
					className={"btn btn-sm btn-error join-item text-xl " + (isRight ? "btn-outline" : "")}
					onClick={() => handleClick(false)}
				>
					💩
				</button>
				<button
					className={"btn btn-sm btn-success join-item text-xl " + (!isRight ? "btn-outline" : "")}
					onClick={() => handleClick(true)}
				>
					🥳
				</button>
			</div>
		</div>
	)
}
