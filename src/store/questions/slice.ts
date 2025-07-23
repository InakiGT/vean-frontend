import { createSlice } from '@reduxjs/toolkit'
import { ThemeWithId } from '@/store/themes/types'
import { fetchThemeWithQuestions } from '@/thunks/theme.thunk'
import { createQuestion, deleteQuestion } from '@/thunks/question.thunk'

const initialState: {
	data: ThemeWithId | undefined,
	loading: boolean,
	error: string | null,
} = {
	data: undefined,
	loading: false,
	error: null,
}

export const questionsSlice = createSlice({
	name: 'themes',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Casos de fetching de un tema con sus preguntas
			.addCase(fetchThemeWithQuestions.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchThemeWithQuestions.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchThemeWithQuestions.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al traer el curso'
			})
			// Caso de agregación de una pregunta
			.addCase(createQuestion.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(createQuestion.fulfilled, (state, action) => {
				state.loading = false
				const mcQuestions = state.data?.mcQuestions
				const openQuestions = state.data?.openQuestions

				if ( action.payload.answer ) {
					openQuestions?.push(action.payload)
				} else {
					mcQuestions?.push(action.payload)
				}

				state.data = {
					...state.data as ThemeWithId,
					mcQuestions,
					openQuestions,
				}
			})
			.addCase(createQuestion.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al agregar la pregunta'
			})
			// Caso de eliminación de un tema
			.addCase(deleteQuestion.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				state.loading = false

				if ( action.payload.status === 204 ) {
					const openQuestions = state.data?.openQuestions?.filter(question => question._id !== action.payload.id)
					const mcQuestions = state.data?.mcQuestions?.filter(question => question._id !== action.payload.id)

					state.data = {
						...state.data as ThemeWithId,
						openQuestions,
						mcQuestions,
					}
				} else {
					state.error = 'Ocurrió un error al intentar eliminar la pregunta'
				}
			})
			.addCase(deleteQuestion.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al eliminar la pregunta'
			})
	},
})

export default questionsSlice.reducer
