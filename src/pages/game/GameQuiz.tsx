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
			setQuestionIndex(questionIndex + 1)
		}

		// Reviwing state
		else {
			props.sendAnswers(answers)
		}
	}

	return (
		<div>
			<h2>Quiz</h2>
			<QuestionView question={questions[questionIndex]} isAnswerVisible={false} />
			<input placeholder="Réponse" onChange={(e) => setAnswer(e.target.value)} />
			<button onClick={handleAnswer}>Repondre</button>
		</div>
	)
}
