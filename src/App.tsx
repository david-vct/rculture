import { Auth } from "./pages/Auth"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { QuestionCreator } from "./pages/QuestionCreator/QuestionCreator"
import { GameController } from "./pages/game/GameController"
import { Oups } from "./pages/Oups"

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<Auth />} />
					<Route path="/questions" element={<QuestionCreator />} />
					<Route path="/games/:gameId" element={<GameController />} />
					<Route path="/error" element={<Oups />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
