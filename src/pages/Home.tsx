import { JoinGame } from "../components/JoinGame"

export const Home = () => {
	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center bg-base-200">
			<div className="flex flex-col items-center w-full sm:w-auto px-4 py-8 sm:px-8">
				<h1 className="text-5xl font-bold">Rculture</h1>
				<p className="py-6">A game about culture, quiz and chill</p>
				<JoinGame />
			</div>
		</div>
	)
}
