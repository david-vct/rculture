import { useNavigate } from "react-router-dom"
import { createGame } from "../services/games-store"
import { useState } from "react"

export const JoinGame = () => {
	const [joinGameId, setJoinGamemId] = useState("")
	const navigate = useNavigate()

	const joinGameHandler = async () => {
		navigate(`/games/${joinGameId}`)
	}
	const newGameHandler = async () => {
		const newGameId = await createGame()
		navigate(`/games/${newGameId}`)
	}

	return (
		<div>
			<div>
				<input
					placeholder="Code"
					onChange={(e) => setJoinGamemId(e.target.value)}
				/>
				<button onClick={joinGameHandler}>Rejoindre partie</button>
			</div>
			<div>
				<button onClick={newGameHandler}>Nouvelle partie</button>
			</div>
		</div>
	)
}
