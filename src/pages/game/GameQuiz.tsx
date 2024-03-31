import { useState } from "react"
import { Game } from "../../utils/types"
import { QuestionView } from "../../components/question/QuestionView"

type GameQuizProps = {
	game: Game
	sendAnswers: (answers: Record<string, string>) => void
}

export const GameQuiz = (props: GameQuizProps) => {
	const [questionIndex, setQuestionIndex] = useState(0)
	const [answer, setAnswer] = useState("")
	const [answers, setAnswers] = useState({} as Record<string, string>)

	const questions = props.game.questions

	// Game play controller
	const handleAnswer = () => {
		// Add answer to answers
		answers[questions[questionIndex].id] = answer
		setAnswers(answers)

		// Next question
		if (questionIndex < questions.length - 1) {
			setAnswer("")
			setQuestionIndex(questionIndex + 1)
		}

		// Reviwing state
		else {
			props.sendAnswers(answers)
		}
	}

	return (
		<div className="flex flex-col w-2xl space-y-4">
			<QuestionView question={questions[questionIndex]} isAnswerVisible={false} />
			<input
				className="input input-bordered rounded-full"
				placeholder="Réponse"
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
			/>
			<button className="btn btn-primary rounded-full" onClick={handleAnswer}>
				Repondre
			</button>
		</div>
	)
}
