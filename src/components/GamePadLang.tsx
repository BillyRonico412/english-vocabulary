import { IonButton, IonIcon, IonRow } from "@ionic/react"
import { volumeHigh } from "ionicons/icons"
import { useMemo } from "react"
import { LangType, getFlagEmoteByLanguage } from "../utils"

interface Props {
	langPad: LangType
	langGame: LangType
	isShow: boolean
	enAndFr: [string, string]
	stop: () => void
	speak: (text: string, lang: "en-US" | "fr-FR") => Promise<void>
}

const GamePadLang = (props: Props) => {
	const indexLang = useMemo(() => {
		switch (props.langPad) {
			case "en":
				return 0
			case "fr":
				return 1
		}
	}, [props.langPad])
	return (
		<IonRow
			className="flex flex-col justify-center items-center font-medium text-2xl bg-opacity-5 relative rounded bg-gray-600"
			color="primary"
		>
			{props.isShow || props.langGame === props.langPad
				? props.enAndFr[indexLang]
				: "******"}
			<div className="absolute w-full bottom-2 px-2 flex items-center">
				<p>{getFlagEmoteByLanguage(props.langPad)}</p>
				<IonButton
					className="ml-auto"
					disabled={!(props.isShow || props.langGame === props.langPad)}
					onClick={() => {
						stop()
						props.speak(
							props.enAndFr[indexLang],
							props.langPad === "en" ? "en-US" : "fr-FR",
						)
					}}
				>
					<IonIcon icon={volumeHigh} />
				</IonButton>
			</div>
		</IonRow>
	)
}

export default GamePadLang
