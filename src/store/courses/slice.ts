import { createSlice } from '@reduxjs/toolkit'
import { CourseWithId } from '@/store/courses/types'
import { fetchCourses, createCourse, deleteCourse } from '@/thunks/course.thunk'

const initialState: {
	data: CourseWithId[] | [],
	loading: boolean,
	error: string | null,
} = {
	data: [],
	loading: false,
	error: null,
}

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Casos de fetching de las materias
			.addCase(fetchCourses.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchCourses.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchCourses.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al traer los cursos'
			})
			// Caso de agregación de una materia
			.addCase(createCourse.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(createCourse.fulfilled, (state, action) => {
				state.loading = false

				if ( action.payload.name ) {
					state.data = [ ...state.data, action.payload as CourseWithId ]
				}
			})
			.addCase(createCourse.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al crear el curso'
			})
			// Caso de eliminación de una materia
			.addCase(deleteCourse.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteCourse.fulfilled, (state, action) => {
				state.loading = false

				if ( action.payload.status === 204 ) {
					state.data = state.data.filter(course => course._id !== action.payload.id)
				} else {
					state.error = 'Ocurrió un error al eliminar el curso'
				}
			})
			.addCase(deleteCourse.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ocurrió un error al eliminar el curso'
			})
	},
})

export default coursesSlice.reducer
