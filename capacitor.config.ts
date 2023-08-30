import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
	appId: "fr.ronicobilly.englishvocabulary",
	appName: "english-vocabulary",
	webDir: "dist",
	server: {
		androidScheme: "https",
	},
	plugins: {},
}

export default config
