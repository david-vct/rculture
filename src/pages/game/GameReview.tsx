import { Game } from "../../utils/types"

type GameReviewProps = {
	game: Game
}

export const GameReview = (props: GameReviewProps) => {
	return (
		<div>
			<h2>Question Review</h2>
			<div>{JSON.stringify(props.game.users)}</div>
		</div>
	)
}
