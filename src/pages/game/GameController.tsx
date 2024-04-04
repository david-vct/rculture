import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { updateGameUserAnswers, updateGameUserReviews } from "../../services/games-store"
import { Game, GameState } from "../../utils/types"
import { getUserInfo } from "../../services/authentication"
import { GameReview } from "./GameReview"
import { GameScoreBoard } from "./GameScoreBoard"
import { GameQuiz } from "./GameQuiz"
import { LobbyRoom } from "./LobbyRoom"

export const GameController = () => {
	const { gameId } = useParams()
	const [gameState, setGameState] = useState(GameState.WAITING)
	const [game, setGame] = useState({} as Game)
	const navigate = useNavigate()

	console.log("Game " + GameState[gameState])

	// Parameter game id validation
	if (gameId === undefined) {
		console.error("Undefined game id")
		navigate("/error/")
		return
	}

	// Lobby room controller
	const handleGameStart = (game: Game) => {
		setGame(game)
		setGameState(GameState.PLAYING)
	}

	// Game quiz controller
	const handleQuizCompeted = (answers: Record<string, string>) => {
		// Update user answers in the database
		updateGameUserAnswers(game.id, getUserInfo().id, answers).then((response) => {
			if (!response.success) {
				console.error(response.error)
				navigate("/error/")
			} else {
				setGameState(GameState.REVIEWING)
			}
		})
	}

	// Game review controller
	const handleReviewCompleted = (reviews: Record<string, Record<string, boolean>>) => {
		// Update user reviews in the database
		updateGameUserReviews(game.id, getUserInfo().id, reviews).then((response) => {
			if (!response.success) {
				console.error(response.error)
				navigate("/error/")
			} else {
				setGameState(GameState.END)
				console.log("Game end!!")
			}
		})
	}

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			{gameState === GameState.WAITING ? (
				<LobbyRoom gameId={gameId} onComplete={handleGameStart} />
			) : gameState === GameState.PLAYING ? (
				<GameQuiz game={game} sendAnswers={handleQuizCompeted} />
			) : gameState === GameState.REVIEWING ? (
				<GameReview game={game} sendReviews={handleReviewCompleted} />
			) : (
				<GameScoreBoard game={game} />
			)}
		</div>
	)
}
