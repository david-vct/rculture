import { useNavigate } from "react-router-dom"
import { createGame } from "../services/games-store"
import { useState } from "react"
import { signIn } from "../services/authentication"

export const JoinGame = () => {
	const [joinGameId, setJoinGamemId] = useState("")
	const [name, setName] = useState("")
	const navigate = useNavigate()

	const joinGameHandler = async () => {
		// Sign in new user
		await signIn(name)
		// Join game
		navigate(`/games/${joinGameId}`)
	}
	const newGameHandler = async () => {
		// Login user
		await signIn(name)
		// Create new game
		const newGameId = await createGame()
		navigate(`/games/${newGameId}`)
	}

	return (
		<div className="flex flex-col items-stretch space-y-4">
			<input
				className="input input-bordered min-w-40 rounded-full"
				value={name}
				placeholder="Nom"
				onChange={(e) => setName(e.target.value)}
			/>
			<div className="join rounded-full">
				<input
					className="input input-bordered min-w-40 join-item"
					placeholder="Code"
					onChange={(e) => setJoinGamemId(e.target.value)}
				/>
				<button className="btn btn-primary join-item" onClick={joinGameHandler}>
					Rejoindre partie
				</button>
			</div>
			<button className="btn btn-secondary self-end rounded-full" onClick={newGameHandler}>
				Nouvelle partie
			</button>
		</div>
	)
}
