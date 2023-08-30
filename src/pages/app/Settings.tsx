import { IonButton, IonContent, IonPage } from "@ionic/react"
import { getAuth, signOut } from "firebase/auth"
import { useAtom, useSetAtom } from "jotai"
import { tryit } from "radash"
import { useCallback } from "react"
import { autoSoundEnabledAtom, toastAtom } from "../../utils"

const Settings = () => {
	const setToast = useSetAtom(toastAtom)
	const [autoSoundEnabled, setAutoSoundEnabled] = useAtom(autoSoundEnabledAtom)
	const onClickDisconnect = useCallback(async () => {
		const auth = getAuth()
		const [errSignOut] = await tryit(signOut)(auth)
		if (errSignOut) {
			setToast({
				color: "danger",
				message: errSignOut.message,
			})
			return
		}
		setToast({
			color: "success",
			message: "Vous êtes déconnecté",
		})
	}, [setToast])
	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="w-full h-full px-4 py-8 flex flex-col gap-y-8 justify-center">
					<div className="flex flex-col gap-y-2">
						<p className="text-center text-lg">Lecture automatique</p>
						<div className="grid grid-rows-2 grid-cols-2 gap-x-2">
							<IonButton
								className="w-full"
								fill={autoSoundEnabled === "none" ? "solid" : "outline"}
								onClick={() => {
									setAutoSoundEnabled("none")
								}}
							>
								Aucune
							</IonButton>
							<IonButton
								className="w-full"
								fill={autoSoundEnabled === "both" ? "solid" : "outline"}
								onClick={() => {
									setAutoSoundEnabled("both")
								}}
							>
								Les Deux
							</IonButton>
							<IonButton
								className="w-full"
								fill={autoSoundEnabled === "en" ? "solid" : "outline"}
								onClick={() => {
									setAutoSoundEnabled("en")
								}}
							>
								English
							</IonButton>
							<IonButton
								className="w-full"
								fill={autoSoundEnabled === "fr" ? "solid" : "outline"}
								onClick={() => {
									setAutoSoundEnabled("fr")
								}}
							>
								Français
							</IonButton>
						</div>
					</div>
					<IonButton onClick={onClickDisconnect}>Deconnexion</IonButton>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Settings
