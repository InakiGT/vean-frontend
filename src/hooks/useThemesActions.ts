import { Theme, ThemeId } from '@/store/themes/types'
import { useAppDispatch } from '@/hooks/store'
import { createTheme, deleteTheme, fetchThemeWithQuestions } from '@/thunks/theme.thunk'

export const useThemesActions = () => {
	const dispatch = useAppDispatch()

	const getThemeWithId = (id: ThemeId) => {
		return dispatch(fetchThemeWithQuestions(id))
	}

	const addTheme = (theme: Theme) => {
		return dispatch(createTheme(theme))
	}

	const removeTheme = (id: ThemeId) => {
		return dispatch(deleteTheme(id))
	}

	return { getThemeWithId, addTheme, removeTheme }
}
