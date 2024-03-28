import { Navbar } from "../../components/Navbar"
import { LobbySettings } from "./LobbySettings"
import { LobbyPlayers } from "./LobbyPlayers"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { addPlayerToGame, listenGame } from "../../services/games-store"
import { getSnapshotData } from "../../services/store"
import { Game, GameSchema, StoreResponse } from "../../utils/types"
import { GameQuestion } from "./GameQuestion"
import { getUserInfo } from "../../services/authentication"

export const GameController = () => {
	const [isSetup, setIsSetup] = useState(false)
	const [questionIndex, setQuestionIndex] = useState(0)
	const [usernames, setUsernames] = useState([] as string[])

	const { gameId } = useParams()
	const navigate = useNavigate()

	if (gameId === undefined) {
		console.error("Undefined game id")
		navigate("/error/")
		return
	}

	// Add user to game
	addPlayerToGame(gameId, getUserInfo())

	// Listen to game changes
	listenGame(gameId, (snapshot) => {
		const response: StoreResponse<Game> = getSnapshotData(snapshot, GameSchema)

		// Error handler
		if (!response.success) {
			console.error(response.error)
			navigate("/error/")
			return
		}
		if (response.data.length !== 1) {
			console.error("Number of games must be 1")
			navigate("/error/")
			return
		}

		// Get this game
		const game = response.data.shift()!

		// Update users
		setUsernames(Object.values(game.users))

		// Control game progression state
		if (isSetup !== game.isSetup) {
			setIsSetup(game.isSetup)
		}
		if (questionIndex !== game.questionIndex) {
			setQuestionIndex(game.questionIndex)
		}
	})

	return (
		<div>
			<Navbar />
			{isSetup ? (
				<GameQuestion />
			) : (
				<div>
					<h1>Nouvelle partie</h1>
					<LobbySettings gameId={gameId} />
					<LobbyPlayers gameId={gameId} usernames={usernames} />
				</div>
			)}
		</div>
	)
}
