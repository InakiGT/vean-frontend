import { createAsyncThunk } from '@reduxjs/toolkit'
import config from '@/config'
import { Question } from '@/store/questions/types'
import { getCookie } from '@/helpers/cookies'

const URI = `${ config.serverUri }/question`

export const createQuestion = createAsyncThunk('/question/create', async (data: Question) => {
	const cookie = await getCookie('jwt')

	const finalURI = `${URI}/${data.answer ? 'open' : 'multipleChoice'}`

	const response = await fetch(finalURI, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ cookie?.value }`,
		},
		body: JSON.stringify({ ...data }),
	})

	return (await response.json()).data
})

export const deleteQuestion = createAsyncThunk('/question/delete',
	async (deleteOptions: { id: string, type: 'open' | 'mc' }) => {
	const cookie = await getCookie('jwt')

	const finalURI = `${URI}/${deleteOptions.type === 'open' ? 'open' : 'multipleChoice'}/${ deleteOptions.id }`

	const response = await fetch(finalURI, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${ cookie?.value }`
		}
	})

	return {
		status: response.status,
		id: deleteOptions.id,
	}
})
