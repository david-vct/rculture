import { useMemo } from "react"
import { Game } from "../../utils/types"
import { useNavigate } from "react-router-dom"

type GameScoreBoardProps = {
	game: Game
	onPlayAgain: () => void
}

export const GameScoreBoard = (props: GameScoreBoardProps) => {
	const scores = useMemo(() => computeScores(props.game), [props.game])
	const userIds = Object.keys(props.game.users)
	userIds.sort((a, b) => scores.global.byUser[b] - scores.global.byUser[a])

	const navigate = useNavigate()

	const handlePlayAgain = () => {
		// Send event to parent
		props.onPlayAgain()
	}

	const handleGoHome = () => {
		navigate("/")
	}

	return (
		<div className="w-full sm:w-3/4 max-w-7xl px-4 py-8 sm:px-8 space-y-4 rounded-box">
			<h1>Score Board</h1>
			<table className="table table-md">
				<thead>
					<tr>
						<th>Question / User</th>
						{userIds.map((id) => (
							<th key={id}>{props.game.users[id].name}</th>
						))}
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{props.game.questions.map((question) => (
						<tr key={question.id}>
							<td>{question.title}</td>
							{userIds.map((id) => (
								<td key={id}>{scores.individual[id][question.id]}</td>
							))}
							<td>
								{scores.global.byQuestion[question.id].win} | {scores.global.byQuestion[question.id].lose}
							</td>
						</tr>
					))}
					<tr>
						<td>Total</td>
						{userIds.map((id) => (
							<td key={id}>{scores.global.byUser[id]}</td>
						))}
						<td>Bravo/10</td>
					</tr>
				</tbody>
			</table>
			<div className="flex flex-row justify-end space-x-4 pt-4">
				<button className="btn btn-primary rounded-full" onClick={handlePlayAgain}>
					Rejouer
				</button>
				<button className="btn btn-outline rounded-full" onClick={handleGoHome}>
					Accueil
				</button>
			</div>
		</div>
	)
}

/**
 * Compute final score of the game
 * structure:
 * 	- global:
 * 		- byQuestion:
 * 			- [questionId]:
 * 				- win: [score]
 * 				- lose: [score]
 * 		- byUser:
 * 			- [userId]: score
 * 	- individual:
 * 		- [userId]:
 * 			- [questionId]: score
 * @param game
 * @returns
 */
function computeScores(game: Game) {
	const scores = {
		global: {
			byQuestion: {} as Record<string, { win: number; lose: number }>,
			byUser: {} as Record<string, number>,
		},
		individual: {} as Record<string, Record<string, number>>,
	}

	const userIds = Object.keys(game.users)
	const nbUsers = userIds.length

	// Loop for every user of every question
	for (const question of game.questions) {
		for (const userId of userIds) {
			// Initialize scores
			if (scores.individual[userId] === undefined) {
				scores.individual[userId] = {}
			}
			if (scores.global.byQuestion[question.id] === undefined) {
				scores.global.byQuestion[question.id] = { win: 0, lose: 0 }
			}
			if (scores.global.byUser[userId] === undefined) {
				scores.global.byUser[userId] = 0
			}

			// Calculate individual user score
			const score = calcUserScore(game, userId, question.id)
			scores.individual[userId][question.id] = score

			// Calculate global score
			const hasWin = score >= nbUsers / 2
			scores.global.byUser[userId] += hasWin ? 1 : 0
			scores.global.byQuestion[question.id][hasWin ? "win" : "lose"] += 1
		}
	}

	return scores
}

function calcUserScore(game: Game, userId: string, questionId: string) {
	const userIds = Object.keys(game.users)
	let score = 0

	for (const otherUserId of userIds) {
		// If the other user reviewed the user answer as right
		if (game.users[otherUserId].reviews[questionId]?.[userId]) {
			score++
		}
	}

	return score
}
