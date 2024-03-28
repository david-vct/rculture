type LobbyPlayersProps = {
	gameId: string
}

export const LobbyPlayers = (props: LobbyPlayersProps) => {
	return (
		<div>
			<h2>Joueurs</h2>
			<div>Game id : {props.gameId}</div>
		</div>
	)
}
