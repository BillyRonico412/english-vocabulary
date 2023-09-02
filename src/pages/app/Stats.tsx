import { IonItem, IonPage, IonText } from "@ionic/react"
import { useAtomValue } from "jotai"
import { dbAtom } from "../../utils"

const Stats = () => {
	const db = useAtomValue(dbAtom)
	if (!db) {
		return <></>
	}
	const easy = Object.values(db.easy).length
	const hard = Object.values(db.hard).length
	const learned = easy + hard
	const toLearn = 3000 - learned
	return (
		<IonPage>
			<div className="w-full h-full px-4 flex flex-col justify-center gap-y-2">
				<IonItem color="primary">
					<IonText>Mots faciles</IonText>
					<IonText className="ml-auto">{easy}</IonText>
				</IonItem>
				<IonItem color="secondary">
					<IonText>Mots difficiles</IonText>
					<IonText className="ml-auto">{hard}</IonText>
				</IonItem>
				<IonItem color="tertiary">
					<IonText>Mots appris</IonText>
					<IonText className="ml-auto">{learned}</IonText>
				</IonItem>
				<IonItem color="medium">
					<IonText>Mots à découvrir</IonText>
					<IonText className="ml-auto">{toLearn}</IonText>
				</IonItem>
			</div>
		</IonPage>
	)
}

export default Stats
