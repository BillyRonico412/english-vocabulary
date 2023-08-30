import {
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from "@ionic/react"
import { cog, gameController, search } from "ionicons/icons"
import { Redirect, Route } from "react-router"
import Game from "./app/Game"
import History from "./app/History"
import Search from "./app/Search"
import Settings from "./app/Settings"

const MainTabs = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Redirect exact path="/app" to="/app/game" />
				<Route exact path="/app/game" render={() => <Game />} />
				<Route exact path="/app/history" render={() => <History />} />
				<Route exact path="/app/search" render={() => <Search />} />
				<Route exact path="/app/settings" render={() => <Settings />} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="game" href="/app/game">
					<IonIcon aria-hidden="true" icon={gameController} />
					<IonLabel>Jeu</IonLabel>
				</IonTabButton>
				<IonTabButton tab="search" href="/app/search">
					<IonIcon aria-hidden="true" icon={search} />
					<IonLabel>Rechercher</IonLabel>
				</IonTabButton>
				<IonTabButton tab="settings" href="/app/settings">
					<IonIcon aria-hidden="true" icon={cog} />
					<IonLabel>Paramètres</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}

export default MainTabs
