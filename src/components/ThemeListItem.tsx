import { useNavigate } from 'react-router-dom'
import { ThemeWithId } from '@/store/themes/types'
import { useThemesActions } from '@/hooks/useThemesActions'
import { useGamesActions } from '@/hooks/useGamesActions'
import { useAppSelector } from '@/hooks/store'


export default function ThemeListItem({ theme }: { theme: ThemeWithId }) {
	const { _id, name } = theme
	const themes = useAppSelector(state => state.games.selectedThemes)
	const navigator = useNavigate()
	const { removeTheme } = useThemesActions()
	const { addThemeToList, removeThemeFromList } = useGamesActions()

	const selectGame = (event: React.MouseEvent<HTMLInputElement>) => {
		if ( event.currentTarget.checked ) {
			addThemeToList(_id)
		} else {
			removeThemeFromList(_id)
		}
	}

	return (
		<li className={`flex items-center gap-3 p-2 rounded-sm ${ themes.includes(_id) && 'bg-gray-300' }`}>
			<input type="checkbox" onClick={ selectGame } />
			<p className="bg-gray-200 p-2 rounded-t-sm text-gray-500 w-50 text-nowrap overflow-x-scroll">{ name }</p>
			<button onClick={ () => navigator(`/theme/${ _id }`) } className="bg-blue-700 text-white uppercase p-2 rounded-sm hover:bg-blue-800 hover:drop-shadow-md cursor-pointer transition-all">Seleccionar</button>
			<button onClick={ () => removeTheme(_id) } className="bg-orange-400 text-white uppercase p-2 rounded-sm hover:bg-orange-500 hover:drop-shadow-md cursor-pointer transition-all">Borrar</button>
		</li>
	)
}
