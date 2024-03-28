type LobbyPlayersProps = {
	gameId: string
	usernames: string[]
}

export const LobbyPlayers = (props: LobbyPlayersProps) => {
	return (
		<div>
			<h2>Joueurs</h2>
			<div>Game id : {props.gameId}</div>
			<ul>
				{props.usernames.map((username) => (
					<li>{username}</li>
				))}
			</ul>
		</div>
	)
}
