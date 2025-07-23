import { cookieStore } from '@/helpers/cookieStore'

export const setCookie = async (name: string, value: string) => {
	await cookieStore.set(name, value)
}

export const getCookie = async (name: string) => {
	return await cookieStore.get(name)
}

export const deleteCookie = async (name: string) => {
	return await cookieStore.delete(name)
}
