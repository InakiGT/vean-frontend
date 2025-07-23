import config from '@/config'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCookie } from '@/helpers/cookies'
import { Game } from '@/store/games/types'

const URI = `${ config.serverUri }/game`

export const fetchGames = createAsyncThunk('/game', async () => {
	const cookie = await getCookie('jwt')

	const response = await fetch(URI, {
		headers: {
			'Authorization': `Bearer ${ cookie?.value }`,
		}
	})

	return (await response.json()).data
})

export const createGame = createAsyncThunk('/game/create', async (game: Game) => {
	const cookie = await getCookie('jwt')

	const response = await fetch(URI, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ cookie?.value }`
		},
		body: JSON.stringify({ ...game }),
	})

	return (await response.json()).data
})

export const deleteGame = createAsyncThunk('/game/delete', async (id: string) => {
	const cookie = await getCookie('jwt')

	const response = await fetch(`${ URI }/${ id }`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${ cookie?.value }`
		},
	})

	return {
		id,
		status: response.status,
	}
})
