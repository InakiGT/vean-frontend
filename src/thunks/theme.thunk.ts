import { createAsyncThunk } from '@reduxjs/toolkit'
import config from '@/config'
import { Theme } from '@/store/themes/types'
import { getCookie } from '@/helpers/cookies'

const URI = `${ config.serverUri }/theme`

export const fetchThemeWithQuestions = createAsyncThunk('/theme/questions', async (id: string) => {
	const response = await fetch(`${ URI }/${ id }`)

	return (await response.json()).data
})

export const createTheme = createAsyncThunk('/theme/create', async (data: Theme) => {
	const cookie = await getCookie('jwt')

	const response = await fetch(URI, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ cookie?.value }`,
		},
		body: JSON.stringify({ ...data }),
	})

	return (await response.json()).data
})

export const deleteTheme = createAsyncThunk('/theme/delete', async (id: string) => {
	const cookie = await getCookie('jwt')

	const response = await fetch(`${ URI }/${ id }`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${ cookie?.value }`
		}
	})

	return {
		id,
		status: response.status,
	}
})
