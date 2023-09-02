import { Preferences } from "@capacitor/preferences"
import { GoogleAuthProvider, User } from "firebase/auth"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import PasswordValidator from "password-validator"
import { tryit } from "radash"
import { z } from "zod"

export const provider = new GoogleAuthProvider()

export interface ToastInterface {
	message: string
	color: "success" | "danger" | "warning" | "info"
}

export const toastAtom = atom<ToastInterface | undefined>(undefined)

export const userAtom = atom<User | undefined | null>(undefined)

export type LangType = "en" | "fr"

export type SoundEnabledType = "none" | LangType | "both"

export const funcStorageInPreferences = <T extends string>() => ({
	async getItem(key: string, initialValue: T) {
		const [errLastValue, lastValue] = await tryit(Preferences.get)({ key })
		if (errLastValue || !lastValue || !lastValue.value) {
			return initialValue
		}
		return lastValue.value as T
	},
	async setItem(key: string, newValue: T) {
		const [errSet] = await tryit(Preferences.set)({ key, value: newValue })
		if (errSet) {
			console.error(errSet)
		}
	},
	async removeItem(key: string) {
		const [errRemove] = await tryit(Preferences.remove)({ key })
		if (errRemove) {
			console.error(errRemove)
		}
	},
})

export const autoSoundEnabledAtom = atomWithStorage<SoundEnabledType>(
	"autoSoundEnabledAtom",
	"both",
	funcStorageInPreferences<SoundEnabledType>(),
)

export type PlayType = "enToFr" | "frToEn" | "random"

export const playTypeAtom = atomWithStorage<PlayType>(
	"playTypeAtom",
	"random",
	funcStorageInPreferences<PlayType>(),
)

export const passwordSchema = new PasswordValidator()
	.is()
	.min(8)
	.is()
	.max(100)
	.has()
	.uppercase()
	.has()
	.lowercase()
	.has()
	.digits()
	.has()
	.not()
	.spaces()

export type DifficultType = "easy" | "hard"

export const getEmoteDifficult = (difficult: DifficultType) => {
	switch (difficult) {
		case "easy":
			return "😊"
		case "hard":
			return "😡"
	}
}

export const getFlagEmoteByLanguage = (lang: LangType) => {
	switch (lang) {
		case "en":
			return "🇺🇸"
		case "fr":
			return "🇫🇷"
	}
}

export const zodBd = z.object({
	easy: z.record(z.number()),
	hard: z.record(z.number()),
})

export const dbAtom = atom<z.infer<typeof zodBd> | undefined>(undefined)
