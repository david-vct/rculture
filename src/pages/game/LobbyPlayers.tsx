import { GameUser } from "../../utils/types"

type LobbyPlayersProps = {
	users: Record<string, GameUser>
}

export const LobbyPlayers = (props: LobbyPlayersProps) => {
	const userIds = Object.keys(props.users)

	return (
		<div className="space-y-4">
			<h2 className="text-2xl">Joueurs</h2>
			<ul>
				{userIds.map((id) => (
					<li key={id}>{props.users[id].name}</li>
				))}
			</ul>
		</div>
	)
}
