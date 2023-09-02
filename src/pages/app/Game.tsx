import { TextToSpeech } from "@capacitor-community/text-to-speech"
import { IonButton, IonContent, IonGrid, IonPage } from "@ionic/react"
import { getDatabase, push, ref } from "firebase/database"
import { useAtomValue } from "jotai"
import { tryit } from "radash"
import { useCallback, useMemo, useState } from "react"
import enToFr from "../../../traduction/enToFr.json"
import GamePadLang from "../../components/GamePadLang"
import {
	DifficultType,
	LangType,
	autoSoundEnabledAtom,
	getEmoteDifficult,
	playTypeAtom,
	userAtom,
} from "../../utils"

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

const enAndFrList = Object.entries(enToFr)

const Game = () => {
	const [langGame, setLangGame] = useState<LangType>("en")
	const [isShow, setIsShow] = useState(false)
	const [indexEnAndFr, setIndexEnAndFr] = useState(0)
	const enAndFr = useMemo(() => enAndFrList[indexEnAndFr], [indexEnAndFr])
	const autoSoundEnabled = useAtomValue(autoSoundEnabledAtom)
	const playType = useAtomValue(playTypeAtom)
	const regenerate = useCallback(() => {
		const newIndexEnAndFr = Math.floor(Math.random() * enAndFrList.length)
		const newEnAndFr = enAndFrList[newIndexEnAndFr]
		const newLangGame = (() => {
			switch (playType) {
				case "enToFr":
					return "en"
				case "frToEn":
					return "fr"
				case "random": {
					const langIndexRandom = Math.floor(Math.random() * 2) as 0 | 1
					return langIndexRandom === 0 ? "en" : "fr"
				}
			}
		})()
		setIndexEnAndFr(newIndexEnAndFr)
		setLangGame(newLangGame)
		setIsShow(false)
		if (
			(autoSoundEnabled === "both" || autoSoundEnabled === "en") &&
			newLangGame === "en"
		) {
			speak(newEnAndFr[0], "en-US")
		} else if (
			(autoSoundEnabled === "both" || autoSoundEnabled === "fr") &&
			newLangGame === "fr"
		) {
			speak(newEnAndFr[1], "fr-FR")
		}
	}, [autoSoundEnabled, playType])
	const user = useAtomValue(userAtom)
	const onClickNext = useCallback(
		(type: DifficultType) => {
			if (!user) {
				return
			}
			const db = getDatabase()
			push(ref(db, `${user.uid}/${type}`), indexEnAndFr)
			regenerate()
		},
		[regenerate, indexEnAndFr, user],
	)
	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="flex flex-col w-full h-full px-4 py-8 gap-y-4">
					<IonGrid className="grid grid-rows-2 w-full flex-grow gap-y-4">
						<GamePadLang
							langPad={"en"}
							isShow={isShow}
							langGame={langGame}
							enAndFr={enAndFr}
							stop={stop}
							speak={speak}
						/>
						<GamePadLang
							langPad={"fr"}
							isShow={isShow}
							langGame={langGame}
							enAndFr={enAndFr}
							stop={stop}
							speak={speak}
						/>
					</IonGrid>
					{!isShow && (
						<IonButton
							onClick={() => {
								setIsShow(true)
								if (
									(autoSoundEnabled === "both" || autoSoundEnabled === "en") &&
									langGame === "fr"
								) {
									speak(enAndFr[0], "en-US")
								} else if (
									(autoSoundEnabled === "both" || autoSoundEnabled === "fr") &&
									langGame === "en"
								) {
									speak(enAndFr[1], "fr-FR")
								}
							}}
						>
							Afficher
						</IonButton>
					)}
					{isShow && (
						<div className="flex gap-x-2">
							{(["hard", "easy"] as const).map((difficult) => (
								<IonButton
									key={difficult}
									className="w-full"
									onClick={() => {
										onClickNext(difficult)
									}}
								>
									{getEmoteDifficult(difficult)}{" "}
									{difficult[0].toUpperCase() + difficult.slice(1)}
								</IonButton>
							))}
						</div>
					)}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Game
