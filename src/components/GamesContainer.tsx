import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/hooks/store'
import { useGamesActions } from '@/hooks/useGamesActions'
import { GameWithId } from '@/store/games/types'
import GetGamesContainerError from '@/components/errors/GetGamesContainerError'

export default function GamesContainer() {

	const themes = useAppSelector(state => state.games.selectedThemes)
	const [ games, setGames ] = useState<GameWithId[]>()
	const { getGames } = useGamesActions()

	const { data, loading, error } = useAppSelector(state => state.games)

	useEffect(() => {
		getGames()
	}, [])

	useEffect(() => {
		setGames(data)
	}, [ data ])

	const getThemesIds = () => {
		return themes.map((theme, id) => {
			if (id === 0) return '?themes=' + theme
			return '&themes=' + theme
		}).join('')
	}

	if (loading) return 'Calgando'
	if (error) return <GetGamesContainerError />

	return (
		<aside className="absolute right-10 bottom-1/4 bg-black/80 drop-shadow-2xl shadow-black h-120 w-40 p-2 rounded-sm flex flex-col">
			<Link to="/games" className="bg-blue-800 text-white font-bold cursor-pointer px-2 py-1 rounded-sm text-center">Ver menú</Link>

			<ul className="mt-2 flex flex-col gap-4 h-full overflow-y-scroll">
				{
					games?.map(game => (
					<li key={ game._id } className="w-full h-25 cursor-pointer">
						<a href={ game.url + getThemesIds() } className="w-full h-full">
							<img
								className="w-full h-full rounded-sm object-cover"
								src={ game.imgUri }
								alt={`Imagen del juego ${ game.name }`}
							/>
						</a></li>
					))
				}
			</ul>
		</aside>
	)
}
