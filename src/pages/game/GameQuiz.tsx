import { useState } from "react"
import { Game } from "../../utils/types"
import { QuestionView } from "../../components/question/QuestionView"
import { Countdown } from "../../components/Countdown"

type GameQuizProps = {
	game: Game
	onComplete: (answers: Record<string, string>) => void
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
			props.onComplete(answers)
		}
	}

	return (
		<div className="flex flex-col w-full sm:w-3/4 max-w-3xl px-4 py-8 sm:px-8 space-y-4 rounded-box backdrop-blur-3xl">
			<div className="flex flex-col items-center pb-16">
				<div className="flex space-x-16">
					<Countdown key={questionIndex} time={props.game.answerDuration} onComplete={handleAnswer} />
					<div>{questionIndex + 1 + " / " + questions.length}</div>
				</div>
				<progress className="progress progress-primary" value={questionIndex + 1} max={questions.length}></progress>
			</div>
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
		</div>
	)
}
