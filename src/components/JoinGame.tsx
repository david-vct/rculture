import { useNavigate } from "react-router-dom"
import { createGame, deleteOldGames } from "../services/games-store"
import { useState } from "react"
import { getUserInfo, signIn } from "../services/authentication"
import { Toast } from "./Toast"
import { toast } from "react-toastify"

export const JoinGame = () => {
	const [joinGameId, setJoinGamemId] = useState("")
	const [name, setName] = useState(getUserInfo().isAuth ? getUserInfo().name : "")
	const navigate = useNavigate()

	const joinGameHandler = async () => {
		// Sign in new user
		const response = await signIn(name)
		if (!response.success) {
			return toast.error("Nom invalide")
		}

		// Join game
		navigate(`/games/${joinGameId}`)
	}

	const newGameHandler = async () => {
		// Login user
		const response = await signIn(name)
		if (!response.success) {
			return toast.error("Nom invalide")
		}

		// Delete old games
		const deleteResponse = await deleteOldGames()
		if (!deleteResponse.success) {
			return toast.error("Problème lors de la suppression des anciennes parties")
		}

		// Create new game
		const gameResponse = await createGame()
		if (!gameResponse.success) {
			return toast.error("Problème lors de la création de la partie")
		}

		// Join game
		navigate(`/games/${gameResponse.data[0]}`)
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
			<button className="btn btn-outline self-end rounded-full" onClick={newGameHandler}>
				Nouvelle partie
			</button>
			<Toast />
		</div>
	)
}
