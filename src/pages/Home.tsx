import { JoinGame } from "../components/JoinGame"

export const Home = () => {
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">Rculture</h1>
					<p className="py-6">A game about culture, quiz and chill</p>
					<JoinGame />
				</div>
			</div>
		</div>
	)
}
