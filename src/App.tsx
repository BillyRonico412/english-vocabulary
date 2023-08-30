import {
	IonApp,
	IonRouterOutlet,
	IonToast,
	setupIonicReact,
} from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router-dom"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/padding.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"

/* Theme variables */
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAtom } from "jotai"
import { useCallback, useEffect } from "react"
import CreateAccount from "./pages/CreateAccount"
import Login from "./pages/Login"
import MainTabs from "./pages/MainTabs"
import "./theme/style.css"
import "./theme/variables.css"
import { toastAtom, userAtom } from "./utils"
import ForgotPassword from "./pages/ForgotPassword"

setupIonicReact()

const App: React.FC = () => {
	const [user, setUser] = useAtom(userAtom)
	const [toast, setToast] = useAtom(toastAtom)
	useEffect(() => {
		const auth = getAuth()
		onAuthStateChanged(auth, (user) => {
			setUser(user)
		})
	}, [setUser])

	const renderNotLoginPage = useCallback(
		(element: JSX.Element) => {
			if (user === undefined) {
				return <></>
			}
			if (user === null) {
				return element
			}
			return <Redirect to="/app/game" />
		},
		[user],
	)

	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route
						exact
						path="/login"
						render={() => renderNotLoginPage(<Login />)}
					/>
					<Route
						exact
						path="/create-account"
						render={() => renderNotLoginPage(<CreateAccount />)}
					/>
					<Route
						exact
						path="/forgot-password"
						render={() => renderNotLoginPage(<ForgotPassword />)}
					/>
					<Route exact path="/" render={() => <Redirect to="/login" />} />
					<Route
						path="/app"
						render={() => {
							if (user === undefined) {
								return <></>
							}
							if (user === null) {
								return <Redirect to="/login" />
							}
							return <MainTabs />
						}}
					/>
				</IonRouterOutlet>
			</IonReactRouter>
			<IonToast
				isOpen={toast !== undefined}
				color={toast?.color}
				message={toast?.message}
				onDidDismiss={() => setToast(undefined)}
				duration={3000}
			/>
		</IonApp>
	)
}

export default App
