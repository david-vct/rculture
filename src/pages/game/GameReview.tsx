import { useState } from "react"
import { QuestionView } from "../../components/question/QuestionView"
import { Game } from "../../utils/types"
import { AnswerReview } from "../../components/question/AnswerReview"

type GameReviewProps = {
	game: Game
	sendReviews: (review: Record<string, Record<string, boolean>>) => void
}

export const GameReview = (props: GameReviewProps) => {
	const [reviews, setReviews] = useState({} as Record<string, Record<string, boolean>>)
	const [questionIndex, setQuestionIndex] = useState(0)
	const [usersIndex, setUsersIndex] = useState(0)

	const question = props.game.questions[questionIndex]
	const userIds = Object.keys(props.game.users)
	const user = props.game.users[userIds[usersIndex]]

	const goNext = () => {
		// Review completed
		if (questionIndex === props.game.questions.length - 1 && usersIndex === userIds.length - 1) {
			props.sendReviews(reviews)
		}
		// Go to next question
		else if (usersIndex === userIds.length - 1) {
			setUsersIndex(0)
			setQuestionIndex(questionIndex + 1)
		}
		// Go to next user
		else {
			setUsersIndex(usersIndex + 1)
		}
	}

	const isRightAnswer = (isRight: boolean) => {
		if (reviews[question.id] === undefined) {
			reviews[question.id] = {}
		}
		reviews[question.id][userIds[usersIndex]] = isRight
		setReviews(reviews)
	}

	return (
		<div>
			<h2>Question Review</h2>
			<QuestionView question={question} />
			<AnswerReview username={user.name} answer={user.answers[question.id]} sendIsRightAnswer={isRightAnswer} />
			<button onClick={goNext}>Suivant</button>
		</div>
	)
}
