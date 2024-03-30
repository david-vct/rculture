import { useState } from "react"
import { Question } from "../../utils/types"

type GameQuestionPorps = {
	question: Question
	sendAnswer: (answer: string) => void
}

export const GameQuestion = (props: GameQuestionPorps) => {
	const [answer, setAnswer] = useState("")

	return (
		<div>
			<h2>Partie!</h2>
			<div>{JSON.stringify(props.question)}</div>
			<input placeholder="Réponse" onChange={(e) => setAnswer(e.target.value)} />
			<button onClick={() => props.sendAnswer(answer)}>Repondre</button>
		</div>
	)
}
