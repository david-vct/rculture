import { startGame } from "../../services/games-store"

type LobbySettingsProps = {
	gameId: string
}

export const LobbySettings = (props: LobbySettingsProps) => {
	const startGameHandler = async () => {
		await startGame(props.gameId)
	}

	return (
		<div>
			<h2>Parametres</h2>
			<div>Game id : {props.gameId}</div>
			<input placeholder="Themes" />
			<button onClick={startGameHandler}>Commencer</button>
		</div>
	)
}
