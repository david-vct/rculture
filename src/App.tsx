import { Auth } from "./pages/Auth"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { QuestionCreator } from "./pages/QuestionCreator/QuestionCreator"

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<Auth />} />
					<Route path="/creation" element={<QuestionCreator />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
