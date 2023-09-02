import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react"
import { getAuth, signOut } from "firebase/auth"
import { gameController, volumeMedium } from "ionicons/icons"
import { useAtom, useSetAtom } from "jotai"
import { tryit } from "radash"
import { useCallback } from "react"
import {
	autoSoundEnabledAtom,
	getFlagEmoteByLanguage,
	playTypeAtom,
	toastAtom,
} from "../../utils"

const Settings = () => {
	const setToast = useSetAtom(toastAtom)
	const [autoSoundEnabled, setAutoSoundEnabled] = useAtom(autoSoundEnabledAtom)
	const [playType, setPlayType] = useAtom(playTypeAtom)
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
						<p className="flex justify-center text-lg items-center gap-x-2">
							Type de jeu <IonIcon icon={gameController} />
						</p>
						<div className="grid grid-cols-3 gap-x-2">
							<IonButton
								onClick={() => {
									setPlayType("random")
								}}
								fill={playType === "random" ? "solid" : "outline"}
							>
								🎲
							</IonButton>
							<IonButton
								onClick={() => {
									setPlayType("enToFr")
								}}
								fill={playType === "enToFr" ? "solid" : "outline"}
							>
								{getFlagEmoteByLanguage("en")} ➡️ {getFlagEmoteByLanguage("fr")}
							</IonButton>
							<IonButton
								onClick={() => {
									setPlayType("frToEn")
								}}
								fill={playType === "frToEn" ? "solid" : "outline"}
							>
								{getFlagEmoteByLanguage("fr")} ➡️ {getFlagEmoteByLanguage("en")}
							</IonButton>
						</div>
					</div>
					<div className="flex flex-col gap-y-2">
						<p className="flex justify-center text-lg items-center gap-x-2">
							Son automatique <IonIcon icon={volumeMedium} />
						</p>
						<div className="grid grid-cols-4 gap-x-2">
							<IonButton
								className="w-full"
								fill={autoSoundEnabled === "none" ? "solid" : "outline"}
								onClick={() => {
									setAutoSoundEnabled("none")
								}}
							>
								🚫
							</IonButton>
							<IonButton
								className="w-full"
								fill={autoSoundEnabled === "both" ? "solid" : "outline"}
								onClick={() => {
									setAutoSoundEnabled("both")
								}}
							>
								{getFlagEmoteByLanguage("en")} {getFlagEmoteByLanguage("fr")}
							</IonButton>
							<IonButton
								className="w-full"
								fill={autoSoundEnabled === "en" ? "solid" : "outline"}
								onClick={() => {
									setAutoSoundEnabled("en")
								}}
							>
								{getFlagEmoteByLanguage("en")}
							</IonButton>
							<IonButton
								className="w-full"
								fill={autoSoundEnabled === "fr" ? "solid" : "outline"}
								onClick={() => {
									setAutoSoundEnabled("fr")
								}}
							>
								{getFlagEmoteByLanguage("fr")}
							</IonButton>
						</div>
						I
					</div>
					<IonButton onClick={onClickDisconnect}>Deconnexion</IonButton>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Settings
