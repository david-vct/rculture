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
		<div className="flex flex-col w-full sm:w-3/4 max-w-3xl px-4 py-8 sm:px-8 rounded-box space-y-4">
			<QuestionView question={questions[questionIndex]} isAnswerVisible={false} />
			<div className="form-control">
				<label className="label">
					<span className="label-text">Réponse</span>
				</label>
				<input
					className="input input-bordered rounded-full"
					placeholder="Euh..."
					value={answer}
					onChange={(e) => setAnswer(e.target.value)}
				/>
			</div>
			<button className="btn btn-primary self-end rounded-full" onClick={handleAnswer}>
				Repondre
			</button>
		</div>
	)
}
