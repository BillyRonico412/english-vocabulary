import {
	IonContent,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonSearchbar,
	IonToolbar,
} from "@ionic/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import enToFr from "../../../traduction/enToFr.json"

const enAndFr = Object.entries(enToFr)

const Search = () => {
	const [searchText, setSearchText] = useState<string>("")
	const enAndFrSearched = useMemo(() => {
		if (!searchText) {
			return enAndFr
		}
		return enAndFr.filter(
			([en, fr]) =>
				en.toLowerCase().includes(searchText.toLowerCase()) ||
				fr.toLowerCase().includes(searchText.toLowerCase()),
		)
	}, [searchText])
	const [items, setItems] = useState<typeof enAndFrSearched>([])
	const generateItems = useCallback(() => {
		setItems((items) => [
			...items,
			...enAndFrSearched.slice(items.length, items.length + 100),
		])
	}, [enAndFrSearched])

	useEffect(() => {
		generateItems()
	}, [generateItems])

	return (
		<IonPage>
			<IonToolbar>
				<IonSearchbar
					placeholder="Rechercher un mot"
					value={searchText}
					onIonInput={(e) => {
						setSearchText(e.detail.value || "")
						setItems([])
					}}
				/>
			</IonToolbar>
			<IonContent fullscreen>
				<IonList>
					{items.map(([en, fr]) => (
						<IonItem key={en}>
							<IonLabel>{en}</IonLabel>
							<IonLabel className="text-right">{fr}</IonLabel>
						</IonItem>
					))}
				</IonList>
				<IonInfiniteScroll
					onIonInfinite={(ev) => {
						generateItems()
						setTimeout(() => ev.target.complete(), 500)
					}}
				>
					<IonInfiniteScrollContent />
				</IonInfiniteScroll>
			</IonContent>
		</IonPage>
	)
}

export default Search
