import { Navbar } from "../../components/Navbar"
import { LobbySettings } from "./LobbySettings"
import { LobbyPlayers } from "./LobbyPlayers"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { addPlayerToGame, listenGame } from "../../services/games-store"
import { getSnapshotData } from "../../services/store"
import { Game, GameSchema, StoreResponse } from "../../utils/types"
import { GameQuestion } from "./GameQuestion"
import { getUserInfo } from "../../services/authentication"
import { isEqual } from "lodash"

export const GameController = () => {
	const [isSetup, setIsSetup] = useState(false)
	const [questionIndex, setQuestionIndex] = useState(0)
	const [usernames, setUsernames] = useState([] as string[])

	const { gameId } = useParams()
	const navigate = useNavigate()

	console.log("Rendering app")

	// Listen to game changes, called once
	useEffect(() => {
		if (gameId === undefined) {
			console.error("Undefined game id")
			navigate("/error/")
			return
		}

		// Add user to game
		addPlayerToGame(gameId, getUserInfo())

		listenGame(gameId, (snapshot) => {
			console.log("Snapshot listener")
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

			// Update users if needed
			if (!isEqual(usernames, game.users)) {
				setUsernames(Object.values(game.users))
			}

			// Control game state
			if (isSetup !== game.isSetup) {
				setIsSetup(game.isSetup)
			}

			// Set next question
			if (questionIndex !== game.questionIndex) {
				setQuestionIndex(game.questionIndex)
			}
		})
	}, [])

	if (gameId === undefined) {
		console.error("Undefined game id")
		navigate("/error/")
		return
	}

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
