import { useEffect, useRef, useState } from "react"
import { addPlayerToGame, listenGame } from "../../services/games-store"
import { getUserInfo } from "../../services/authentication"
import { useNavigate } from "react-router-dom"
import { Game, GameSchema, StoreResponse } from "../../utils/types"
import { getSnapshotData } from "../../services/store"
import { LobbySettings } from "./LobbySettings"
import { LobbyPlayers } from "./LobbyPlayers"
import { isEqual } from "lodash"
import { QuerySnapshot } from "firebase/firestore"

type LobbyRoomProps = {
	gameId: string
	onComplete: (game: Game) => void
}

export const LobbyRoom = (props: LobbyRoomProps) => {
	const [users, setUsers] = useState({})
	const unsubscribe = useRef(() => {})
	const navigate = useNavigate()

	const handleGameUpdate = (snapshot: QuerySnapshot) => {
		console.log("Snapshot listener")

		// Format as a game response
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
		if (!isEqual(users, game.users)) {
			setUsers(Object.values(game.users))
		}

		// Start the game play if the game is ready
		if (game.isSetup) {
			// Unsubscribe from game listener
			unsubscribe.current()
			// Send event to parent
			props.onComplete(game)
		}
	}

	useEffect(() => {
		// Add user to game
		addPlayerToGame(props.gameId, getUserInfo())

		// Listen for game updates
		unsubscribe.current = listenGame(props.gameId, handleGameUpdate)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="w-full lg:w-3/4 max-w-7xl px-4 py-8 lg:px-8 space-y-4 rounded-box ">
			<h1 className="text-5xl font-bold pb-16">Nouvelle partie</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<LobbySettings gameId={props.gameId} />
				<LobbyPlayers users={users} />
			</div>
		</div>
	)
}
