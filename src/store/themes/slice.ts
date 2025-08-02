import { createSlice } from '@reduxjs/toolkit'
import { CourseWithId } from '@/store/courses/types'
import { fetchCourseWithThemes } from '@/thunks/course.thunk'
import { createTheme, deleteTheme, updateTheme } from '@/thunks/theme.thunk'

const initialState: {
	data: CourseWithId | undefined,
	loading: boolean,
	error: string | null,
} = {
	data: undefined,
	loading: false,
	error: null,
}

export const themesSlice = createSlice({
	name: 'themes',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Casos de fetching de un curso con sus temas
			.addCase(fetchCourseWithThemes.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchCourseWithThemes.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchCourseWithThemes.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al traer el curso'
			})
			// Caso de agregación de un tema
			.addCase(createTheme.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(createTheme.fulfilled, (state, action) => {
				state.loading = false

				state.data = {
					...state.data as CourseWithId,
					themes: [ ...state.data?.themes ?? [], action.payload ]
				}
			})
			.addCase(createTheme.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al agregar el curso'
			})
			// Caso de actualización de un tema
			.addCase(updateTheme.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(updateTheme.fulfilled, (state, action) => {
				state.loading = false
				const { id, name, status } = action.payload

				if ( status === 204 ) {
					const index = state.data?.themes?.findIndex(theme => theme._id === id)

					if ( index !== undefined && index !== -1 && state.data?.themes ) {
						state.data.themes[index].name = name
					}
				} else {
					state.error = 'Ocurrió un error al editar el curso'
				}
			})
			.addCase(updateTheme.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al actualizar el curso'
			})
			// Caso de eliminación de un tema
			.addCase(deleteTheme.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteTheme.fulfilled, (state, action) => {
				state.loading = false

				if ( action.payload.status === 204 ) {
					const themes = state.data?.themes?.filter(theme => theme._id !== action.payload.id)

					state.data = {
						...state.data as CourseWithId,
						themes,
					}
				} else {
					state.error = 'Ocurrió un error al intentar eliminar el curso'
				}
			})
			.addCase(deleteTheme.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al eliminar el curso'
			})
	},
})

export default themesSlice.reducer
