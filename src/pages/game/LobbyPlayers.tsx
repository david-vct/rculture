import { GameUser } from "../../utils/types"

type LobbyPlayersProps = {
	usernames: Record<string, GameUser>
}

export const LobbyPlayers = (props: LobbyPlayersProps) => {
	const userIds = Object.keys(props.usernames)

	return (
		<div>
			<h2>Joueurs</h2>
			<ul>
				{userIds.map((id) => (
					<li key={id}>{props.usernames[id].name}</li>
				))}
			</ul>
		</div>
	)
}
