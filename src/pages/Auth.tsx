import { useEffect, useState } from "react"
import {
	getUserInfo,
	logout,
	signIn,
	signInWithGoogle,
} from "../services/authentication"
import { Navbar } from "../components/Navbar"

export const Auth = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")

	useEffect(() => {
		const userInfo = getUserInfo()
		setUsername(userInfo.name)
	}, [])

	return (
		<div>
			<Navbar />
			<div>
				<input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
				<input
					placeholder="Password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={() => signIn(email, password)}>Sign In</button>
				<button onClick={signInWithGoogle}>Sign in with Google</button>
				<button onClick={logout}>Logout</button>
			</div>
			<div>Hello {username}!</div>
		</div>
	)
}
