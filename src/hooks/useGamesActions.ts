import { useAppDispatch } from '@/hooks/store'
import { addThemeToSelection, deleteThemeFromSelection } from '@/store/games/slice'
import { Game, GameId } from '@/store/games/types'
import { createGame, deleteGame, fetchGames } from '@/thunks/game.thunk'

export const useGamesActions = () => {
	const dispatch = useAppDispatch()

	const getGames = () => {
		return dispatch(fetchGames())
	}

	const removeGame = (id: GameId) => {
		return dispatch(deleteGame(id))
	}

	const addGame = (game: Game) => {
		return dispatch(createGame(game))
	}

	const addThemeToList = (id: GameId) => {
		return dispatch(addThemeToSelection(id))
	}

	const removeThemeFromList = (id: GameId) => {
		return dispatch(deleteThemeFromSelection(id))
	}

	return { getGames, addGame, removeGame, addThemeToList, removeThemeFromList }
}
