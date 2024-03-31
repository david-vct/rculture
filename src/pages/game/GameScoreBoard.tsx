import { useMemo } from "react"
import { Game } from "../../utils/types"

type GameScoreBoardProps = {
	game: Game
}

export const GameScoreBoard = (props: GameScoreBoardProps) => {
	const scores = useMemo(() => computeScores(props.game), [props.game])
	const userIds = Object.keys(props.game.users)

	return (
		<div>
			<h1>Score Board</h1>
			<div>{JSON.stringify(props.game)}</div>
			<table>
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
								{scores.global.byQuestion[question.id].win} / {scores.global.byQuestion[question.id].lose}
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
		</div>
	)
}

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
