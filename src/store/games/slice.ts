import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameId, GameWithId } from '@/store/games/types'
import { createGame, deleteGame, fetchGames } from '@/thunks/game.thunk'

const initialState: {
	data: GameWithId[] | [],
	selectedThemes: string[],
	loading: boolean,
	error: string | null,
} = {
	data: [],
	selectedThemes: [],
	loading: false,
	error: null,
}

export const gamesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		addThemeToSelection: (state, action: PayloadAction<GameId>) => {
			state.selectedThemes = [ ...state.selectedThemes, action.payload ]
		},
		deleteThemeFromSelection: (state, action: PayloadAction<GameId>) => {
			state.selectedThemes = state.selectedThemes.filter(theme => theme !== action.payload)
		},
	},
	extraReducers: builder => {
		builder
			// Casos de fetching de las materias
			.addCase(fetchGames.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchGames.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchGames.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al traer los juegos'
			})
			// Caso de agregación de una materia
			.addCase(createGame.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(createGame.fulfilled, (state, action) => {
				state.loading = false

				if ( action.payload.name ) {
					state.data = [ ...state.data, action.payload as GameWithId ]
				}
			})
			.addCase(createGame.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al crear el juego'
			})
			// Caso de eliminación de un juego
			.addCase(deleteGame.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteGame.fulfilled, (state, action) => {
				state.loading = false

				if ( action.payload.status === 204 ) {
					state.data = state.data.filter(game => game._id !== action.payload.id)
				} else {
					state.error = 'Ocurrió un error al eliminar el juego'
				}
			})
			.addCase(deleteGame.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al eliminar el juego'
			})
	},
})

export default gamesSlice.reducer
export const  { addThemeToSelection, deleteThemeFromSelection } = gamesSlice.actions
