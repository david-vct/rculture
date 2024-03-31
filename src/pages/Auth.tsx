import { useState } from "react"
import { logout, signIn, signInWithGoogle } from "../services/authentication"
import { Navbar } from "../components/Navbar"

export const Auth = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<div className="hero min-h-screen bg-base-200">
			<Navbar />
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								className="input input-bordered"
								placeholder="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								className="input input-bordered"
								placeholder="password"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="form-control mt-6">
							<button className="btn btn-neutral" onClick={() => signIn(email, password)}>
								Sign In
							</button>
						</div>

						<div className="divider">ou</div>

						<button className="btn btn-primary" onClick={signInWithGoogle}>
							Sign in with Google
						</button>

						<div className="mt-6">
							Assez pour aujourd'hui...&nbsp;
							<span>
								<a className="link" onClick={logout}>
									logout
								</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
