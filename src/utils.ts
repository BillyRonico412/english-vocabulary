import { Preferences } from "@capacitor/preferences"
import { GoogleAuthProvider, User } from "firebase/auth"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import PasswordValidator from "password-validator"
import { tryit } from "radash"

export const provider = new GoogleAuthProvider()

export interface ToastInterface {
	message: string
	color: "success" | "danger" | "warning" | "info"
}

export const toastAtom = atom<ToastInterface | undefined>(undefined)

export const userAtom = atom<User | undefined | null>(undefined)

export type SoundEnabledType = "none" | "fr" | "en" | "both"
export const autoSoundEnabledAtom = atomWithStorage<SoundEnabledType>(
	"autoSoundEnabledAtom",
	"both",
	{
		async getItem(key, initialValue) {
			const [errLastValue, lastValue] = await tryit(Preferences.get)({ key })
			if (errLastValue || !lastValue || !lastValue.value) {
				return initialValue
			}
			return lastValue.value as SoundEnabledType
		},
		async setItem(key, newValue) {
			const [errSet] = await tryit(Preferences.set)({ key, value: newValue })
			if (errSet) {
				console.error(errSet)
			}
		},
		async removeItem(key) {
			const [errRemove] = await tryit(Preferences.remove)({ key })
			if (errRemove) {
				console.error(errRemove)
			}
		},
	},
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
