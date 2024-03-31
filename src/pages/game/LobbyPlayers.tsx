import { GameUser } from "../../utils/types"

type LobbyPlayersProps = {
	users: Record<string, GameUser>
}

export const LobbyPlayers = (props: LobbyPlayersProps) => {
	const userIds = Object.keys(props.users)

	return (
		<div>
			<h2>Joueurs</h2>
			<ul>
				{userIds.map((id) => (
					<li key={id}>{props.users[id].name}</li>
				))}
			</ul>
		</div>
	)
}
