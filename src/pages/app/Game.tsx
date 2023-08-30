import { TextToSpeech } from "@capacitor-community/text-to-speech"
import {
	IonButton,
	IonContent,
	IonGrid,
	IonIcon,
	IonPage,
	IonRow,
} from "@ionic/react"
import { volumeHigh } from "ionicons/icons"
import { useAtomValue } from "jotai"
import { tryit } from "radash"
import { useCallback, useState } from "react"
import enToFr from "../../../traduction/enToFr.json"
import { autoSoundEnabledAtom } from "../../utils"

const speak = async (text: string, lang: "en-US" | "fr-FR") => {
	await tryit(TextToSpeech.speak)({
		text,
		lang: lang,
		rate: 1.0,
		pitch: 1.0,
		volume: 1.0,
		category: "ambient",
	})
}

const stop = async () => {
	await tryit(TextToSpeech.stop)()
}

const Game = () => {
	const enAndFr = Object.entries(enToFr)
	const [langRandom, setLangRandom] = useState<0 | 1>(0)
	const [isShow, setIsShow] = useState(false)
	const [enAndFrRandom, setEnAndFrRandom] = useState(
		enAndFr[Math.floor(Math.random() * enAndFr.length)],
	)
	const autoSoundEnabled = useAtomValue(autoSoundEnabledAtom)
	const regenerate = useCallback(() => {
		const newEnAndFr = enAndFr[Math.floor(Math.random() * enAndFr.length)]
		const newLangRandom = Math.floor(Math.random() * 2) as 0 | 1
		setEnAndFrRandom(newEnAndFr)
		setLangRandom(newLangRandom)
		setIsShow(false)
		if (
			(autoSoundEnabled === "both" || autoSoundEnabled === "en") &&
			newLangRandom === 0
		) {
			speak(newEnAndFr[0], "en-US")
		} else if (
			(autoSoundEnabled === "both" || autoSoundEnabled === "fr") &&
			newLangRandom === 1
		) {
			speak(newEnAndFr[1], "fr-FR")
		}
	}, [enAndFr, autoSoundEnabled])
	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="flex flex-col w-full h-full px-4 py-8 gap-y-4">
					<IonGrid className="grid grid-rows-2 w-full flex-grow gap-y-4">
						<IonRow class="flex flex-col justify-center items-center font-medium text-2xl bg-gray-600 bg-opacity-10 relative">
							{isShow || langRandom === 0 ? enAndFrRandom[0] : "******"}
							<div className="absolute w-full bottom-2 px-2 flex items-center">
								<p>🇺🇸</p>
								<IonButton
									className="ml-auto"
									disabled={!(isShow || langRandom === 0)}
									onClick={() => {
										stop()
										speak(enAndFrRandom[0], "en-US")
									}}
								>
									<IonIcon icon={volumeHigh} />
								</IonButton>
							</div>
						</IonRow>
						<IonRow class="flex flex-col justify-center items-center font-medium text-2xl bg-gray-600 bg-opacity-10 relative">
							{isShow || langRandom === 1 ? enAndFrRandom[1] : "******"}
							<div className="absolute w-full bottom-2 px-2 flex items-center">
								<p>🇲🇫</p>
								<IonButton
									className="ml-auto"
									disabled={!(isShow || langRandom === 1)}
									onClick={() => {
										stop()
										speak(enAndFrRandom[1], "fr-FR")
									}}
								>
									<IonIcon icon={volumeHigh} />
								</IonButton>
							</div>
						</IonRow>
					</IonGrid>
					{!isShow && (
						<IonButton
							onClick={() => {
								setIsShow(true)
								if (
									(autoSoundEnabled === "both" || autoSoundEnabled === "en") &&
									langRandom === 1
								) {
									speak(enAndFrRandom[0], "en-US")
								} else if (
									(autoSoundEnabled === "both" || autoSoundEnabled === "fr") &&
									langRandom === 0
								) {
									speak(enAndFrRandom[1], "fr-FR")
								}
							}}
						>
							Afficher
						</IonButton>
					)}
					{isShow && (
						<IonButton
							onClick={() => {
								regenerate()
							}}
						>
							Suivant
						</IonButton>
					)}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Game
