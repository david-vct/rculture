import { Navbar } from "../../components/Navbar"
import { LobbySettings } from "./LobbySettings"
import { LobbyPlayers } from "./LobbyPlayers"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { listenGame } from "../../services/games-store"
import { getSnapshotData } from "../../services/store"
import { Game, GameSchema, StoreResponse } from "../../utils/types"
import { GameQuestion } from "./GameQuestion"

export const GameController = () => {
	const [isSetup, setIsSetup] = useState(false)
	const [questionIndex, setQuestionIndex] = useState(0)

	const { gameId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (gameId === undefined) {
			console.error("Undefined game id")
			navigate("/")
			return
		}

		listenGame(gameId, (snapshot) => {
			const response: StoreResponse<Game> = getSnapshotData(snapshot, GameSchema)

			// Error handler
			if (!response.success) {
				console.error(response.error)
				navigate("/")
				return
			}

			// Control game progression state
			const games = response.data

			games.forEach((game) => {
				if (isSetup !== game.isSetup) {
					setIsSetup(game.isSetup)
				}
				if (questionIndex !== game.questionIndex) {
					setQuestionIndex(game.questionIndex)
				}
			})
		})
	})

	return (
		<div>
			<Navbar />
			{isSetup ? (
				<GameQuestion />
			) : (
				<div>
					<h1>Nouvelle partie</h1>
					<LobbySettings gameId={gameId!} />
					<LobbyPlayers gameId={gameId!} />
				</div>
			)}
		</div>
	)
}
