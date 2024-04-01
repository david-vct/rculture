import { Auth } from "./pages/Auth"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { QuestionCreator } from "./pages/QuestionCreator/QuestionCreator"
import { GameController } from "./pages/game/GameController"
import { Oups } from "./pages/Oups"
import { TestsPage } from "./pages/TestsPage"
import { Navbar } from "./components/Navbar"

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<Auth />} />
					<Route path="/questions" element={<QuestionCreator />} />
					<Route path="/games/:gameId" element={<GameController />} />
					<Route path="/error" element={<Oups />} />
					<Route path="/tests" element={<TestsPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
