import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from '@/store/courses/slice'
import themesReducer from '@/store/themes/slice'
import questionsReducer from '@/store/questions/slice'
import gamesReducer from '@/store/games/slice'

export const store = configureStore({
	reducer: {
		courses: coursesReducer,
		themes: themesReducer,
		questions: questionsReducer,
		games: gamesReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
