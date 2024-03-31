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
		<div className="flex flex-col space-y-4">
			<div>
				<div className="join">
					<input
						className="input input-bordered rounded-full join-item"
						placeholder="Code"
						onChange={(e) => setJoinGamemId(e.target.value)}
					/>
					<button className="btn btn-primary rounded-r-full join-item" onClick={joinGameHandler}>
						Rejoindre partie
					</button>
				</div>
			</div>
			<div>
				<button className="btn btn-secondary rounded-full" onClick={newGameHandler}>
					Nouvelle partie
				</button>
			</div>
		</div>
	)
}
