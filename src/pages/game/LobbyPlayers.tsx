import { GameUser } from "../../utils/types"

type LobbyPlayersProps = {
	users: Record<string, GameUser>
}

export const LobbyPlayers = (props: LobbyPlayersProps) => {
	const userIds = Object.keys(props.users)

	return (
		<div className="flex flex-col space-y-4">
			<h2 className="text-2xl">Partage</h2>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Invitez des amis</span>
				</label>
				<div className="join rounded-full w-full max-w-sm">
					<input
						type="text"
						readOnly
						className="input input-bordered join-item w-full"
						value={window.location.href}
					></input>
					<button
						type="button"
						className="btn btn-neutral btn-outline join-item w-fit "
						onClick={() => navigator.clipboard.writeText(window.location.href)}
					>
						Copier
					</button>
				</div>
			</div>
			<div>
				<label className="label">
					<span className="label-text">Joueurs</span>
				</label>
				<ul>
					{userIds.map((id) => (
						<li key={id}>{props.users[id].name}</li>
					))}
				</ul>
			</div>
		</div>
	)
}
