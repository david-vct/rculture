import { useState } from "react"
import { startGame } from "../../services/games-store"
import { splitAndTrim } from "../../utils/utils"

type LobbySettingsProps = {
	gameId: string
}

export const LobbySettings = (props: LobbySettingsProps) => {
	const [tags, setTags] = useState("")
	const [nbQuestion, setNbQuestions] = useState(10)

	const startGameHandler = () => {
		startGame(props.gameId, splitAndTrim(tags), nbQuestion).then((response) => {
			if (!response.success) {
				console.error(response.error)
			} else {
				console.log(response.data)
			}
		})
	}

	const setNbQuestionsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value)
		if (!isNaN(value)) setNbQuestions(value)
	}

	return (
		<div>
			<h2>Parametres</h2>
			<div>Game id : {props.gameId}</div>
			<input placeholder="Tags" onChange={(e) => setTags(e.target.value)} />
			<input placeholder="Nombre de questions" type="number" value={nbQuestion} onChange={setNbQuestionsHandler} />
			<button onClick={startGameHandler}>Commencer</button>
		</div>
	)
}
