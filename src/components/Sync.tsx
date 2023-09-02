import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAtom, useSetAtom } from "jotai"
import { useEffect } from "react"
import { dbAtom, userAtom, zodBd } from "../utils"
import { getDatabase, off, onValue, ref } from "firebase/database"

const Sync = () => {
	const [user, setUser] = useAtom(userAtom)
	useEffect(() => {
		const auth = getAuth()
		onAuthStateChanged(auth, (user) => {
			setUser(user)
		})
	}, [setUser])

	const setDb = useSetAtom(dbAtom)
	useEffect(() => {
		if (!user) {
			return
		}
		const db = getDatabase()
		const dbRef = ref(db, user.uid)
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val()
			const newDb = zodBd.parse(data)
			setDb(newDb)
		})
		return () => {
			off(dbRef)
		}
	}, [setDb, user])
	return <></>
}

export default Sync
