import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { findGameById, resetGame, updateGameUserAnswers, updateGameUserReviews } from "../../services/games-store"
import { Game, GameState } from "../../utils/types"
import { getUserInfo } from "../../services/authentication"
import { GameReview } from "./GameReview"
import { GameScoreBoard } from "./GameScoreBoard"
import { GameQuiz } from "./GameQuiz"
import { LobbyRoom } from "./LobbyRoom"
import { toast } from "react-toastify"
import { Toast } from "../../components/Toast"
import { LoadingPage } from "../../components/LoadingPage"

export const GameController = () => {
	const { gameId } = useParams()
	const [gameState, setGameState] = useState(GameState.WAITING)
	const [game, setGame] = useState({} as Game)
	const [isLoading, setIsLoading] = useState(false)
	const [loadingCallback, setLoadingCallback] = useState(() => () => {})
	const navigate = useNavigate()

	// Parameter game id validation
	if (gameId === undefined) {
		console.error("Undefined game id")
		navigate("/error/")
		return
	}

	// Lobby room controller
	const handleGameStart = (game: Game) => {
		setGame(game)
		// Set game state to current state
		setGameState(game.state)
	}

	// Game quiz controller
	const handleQuizCompeted = (answers: Record<string, string>) => {
		// Push user answers to the database
		updateGameUserAnswers(game.id, getUserInfo().id, answers).then((response) => {
			if (!response.success) {
				console.error(response.error)
				toast.error("Problème lors de la synchronisation des réponses")
			} else {
				loadNextGamePhase(GameState.REVIEWING)
			}
		})
	}

	// Game review controller
	const handleReviewCompleted = (reviews: Record<string, Record<string, boolean>>) => {
		// Update user reviews in the database
		updateGameUserReviews(game.id, getUserInfo().id, reviews).then((response) => {
			if (!response.success) {
				console.error(response.error)
				toast.error("Problème lors de la synchronisation des notations")
			} else {
				loadNextGamePhase(GameState.END)
			}
		})
	}

	const handlePlayAgain = () => {
		// Reset game
		resetGame(game.id, game).then((response) => {
			if (!response.success) {
				console.error(response.error)
				toast.error("Problème lors de la réinitialisation de la partie")
			} else {
				setGameState(GameState.WAITING)
			}
		})
	}

	/**
	 * Sets updated game data and change game state
	 * @param nextGameState
	 */
	const loadNextGamePhase = (nextGameState: GameState) => {
		setIsLoading(true)

		// This callback will fetch updated game and go to next state on finish
		setLoadingCallback(() => () => {
			// Fetch updated game
			findGameById(game.id).then((response) => {
				if (!response.success) {
					console.error(response.error)
					toast.error("Problème lors de la synchronisation de la partie")
				} else if (response.data.length !== 1) {
					console.error("Number of games must be 1")
					toast.error("Problème lors de la synchronisation de la partie")
				} else {
					setGame(response.data.shift()!)
					setGameState(nextGameState)
				}

				setIsLoading(false)
			})
		})
	}

	return (
		<div className="min-h-screen flex flex-col justify-center items-center pt-16">
			{gameState === GameState.WAITING ? (
				<LobbyRoom gameId={gameId} onComplete={handleGameStart} />
			) : gameState === GameState.PLAYING ? (
				<GameQuiz game={game} onComplete={handleQuizCompeted} />
			) : gameState === GameState.REVIEWING ? (
				<GameReview game={game} sendReviews={handleReviewCompleted} />
			) : (
				<GameScoreBoard game={game} onPlayAgain={handlePlayAgain} />
			)}
			{isLoading && <LoadingPage duration={3000} text="Synchronisation" onComplete={loadingCallback} />}
			<Toast />
		</div>
	)
}
