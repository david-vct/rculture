import { useState } from "react"
import { logout, signInWithEmail, signInWithGoogle } from "../services/authentication"
import { Toast } from "../components/Toast"
import { toast } from "react-toastify"

export const Auth = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")

	const handleSignInWithEmail = (email: string, name: string, password: string) => {
		signInWithEmail(email, name, password).then((response) => {
			if (response.success) {
				toast.success("Connexion reussie")
			} else {
				toast.error("Erreur lors de la connexion")
			}
		})
	}

	const handleSignInWithGoogle = () => {
		signInWithGoogle().then((response) => {
			if (response.success) {
				toast.success("Connexion reussie")
			} else {
				toast.error("Erreur lors de la connexion")
			}
		})
	}

	const handleLogout = () => {
		logout()
	}

	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content w-2/3 max-w-md flex-col lg:flex-row-reverse">
				<div className="card shrink-0 w-full shadow-2xl bg-base-100">
					<div className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Nom</span>
							</label>
							<input
								type="email"
								className="input input-bordered rounded-full"
								placeholder="nom"
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								className="input input-bordered rounded-full"
								placeholder="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								className="input input-bordered rounded-full"
								placeholder="password"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="form-control mt-6">
							<button
								className="btn btn-neutral rounded-full"
								onClick={() => handleSignInWithEmail(email, name, password)}
							>
								Sign In
							</button>
						</div>

						<div className="divider">ou</div>

						<button className="btn btn-primary rounded-full" onClick={handleSignInWithGoogle}>
							Sign in with Google
						</button>

						<div className="mt-6">
							Assez pour aujourd'hui...&nbsp;
							<span>
								<a className="link" onClick={handleLogout}>
									logout
								</a>
							</span>
						</div>
					</div>
				</div>
			</div>
			<Toast />
		</div>
	)
}
