type LobbyPlayersProps = {
	usernames: string[]
}

export const LobbyPlayers = (props: LobbyPlayersProps) => {
	return (
		<div>
			<h2>Joueurs</h2>
			<ul>
				{props.usernames.map((username) => (
					<li>{username}</li>
				))}
			</ul>
		</div>
	)
}
