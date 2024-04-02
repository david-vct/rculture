import { createUserWithEmailAndPassword, signInWithPopup, signInAnonymously, signOut } from "firebase/auth"
import { auth, googleAuthProvider } from "../config/firebase"
import { UserInfo } from "../utils/types"
import { initializeAnonymousUserInfo } from "../utils/utils"

export async function signIn(name: string) {
	try {
		const response = await signInAnonymously(auth)
		const userInfo = {
			id: response.user.uid,
			name: name,
			isAuth: true,
		}
		storeUserInfo(userInfo)
	} catch (error) {
		console.error(error)
	}
}

/**
 * Sign in app with an email and password
 * @param email
 * @param password
 */
export async function signInWithEmail(email: string, password: string) {
	try {
		await createUserWithEmailAndPassword(auth, email, password)
	} catch (e) {
		console.error(e)
	}
}

/**
 * Sign in app with a Google account
 */
export async function signInWithGoogle() {
	try {
		const response = await signInWithPopup(auth, googleAuthProvider)
		const userInfo = {
			id: response.user.uid,
			name: response.user.displayName ?? "Anonymous",
			isAuth: true,
		}
		storeUserInfo(userInfo)
	} catch (e) {
		console.error(e)
	}
}

/**
 * Log out from any account
 */
export async function logout() {
	try {
		await signOut(auth)
		// Delete user from local storage
		storeUserInfo(initializeAnonymousUserInfo())
	} catch (error) {
		console.error(error)
	}
}

/**
 * Store user info on the local storage
 * @param id
 * @param name
 * @param isAuth
 */
function storeUserInfo(userInfo: UserInfo) {
	localStorage.setItem("auth", JSON.stringify(userInfo))
}

/**
 * Get user info from the local storage
 * @returns UserInfo
 */
export function getUserInfo(): UserInfo {
	const userInfoJson = localStorage.getItem("auth")

	if (userInfoJson === null) {
		return initializeAnonymousUserInfo()
	}

	return JSON.parse(userInfoJson) as UserInfo
}
