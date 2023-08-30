import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useSetAtom } from "jotai"
import { tryit } from "radash"
import { useCallback, useState } from "react"
import { toastAtom } from "../utils"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const setToast = useSetAtom(toastAtom)
	const onClickConnect = useCallback(async () => {
		const auth = getAuth()
		const [errResultSignIn] = await tryit(signInWithEmailAndPassword)(
			auth,
			email,
			password,
		)
		if (errResultSignIn) {
			setToast({
				color: "danger",
				message: errResultSignIn.message,
			})
			return
		}
		setToast({
			color: "success",
			message: "Vous êtes connecté",
		})
	}, [setToast, email, password])
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Authentification</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className="w-full h-full px-4 py-4 flex flex-col gap-y-8">
					<div className="flex flex-col gap-y-4 mt-auto">
						<p className="text-center pb-8 text-2xl font-semibold italic">
							English vocabulary
						</p>
						<IonInput
							type="text"
							label="Adresse email"
							labelPlacement="floating"
							fill="solid"
							onInput={(e) => {
								if (typeof e.currentTarget.value === "string") {
									setEmail(e.currentTarget.value)
								}
							}}
							value={email}
						/>
						<IonInput
							type="password"
							label="Mot de passe"
							labelPlacement="floating"
							fill="solid"
							onInput={(e) => {
								if (typeof e.currentTarget.value === "string") {
									setPassword(e.currentTarget.value)
								}
							}}
							value={password}
						/>
					</div>
					<div className="flex flex-col gap-y-4 mb-auto">
						<IonButton onClick={onClickConnect}>Se connecter</IonButton>
						<IonButton className="w-full" routerLink="/create-account">
							S'inscrire
						</IonButton>
						<IonButton
							className="w-full"
							routerLink="/forgot-password"
							fill="clear"
						>
							Mot de passe oublié
						</IonButton>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Login
