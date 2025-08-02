import { createAsyncThunk } from '@reduxjs/toolkit'
import config from '@/config'
import { Theme, ThemeWithId } from '@/store/themes/types'
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

export const updateTheme = createAsyncThunk('/theme/update', async (theme: ThemeWithId) => {
	const cookie = await getCookie('jwt')
	const { _id, name } = theme

	const response = await fetch(`${ URI }/${ _id }`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ cookie?.value }`
		},
		body: JSON.stringify({ name }),
	})

	return {
		id: _id,
		name,
		status: response.status,
	}
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
