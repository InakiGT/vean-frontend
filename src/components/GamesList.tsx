import { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/store'
import { useGamesActions } from '@/hooks/useGamesActions'
import { GameWithId } from '@/store/games/types'
import GetItemsError from '@/components/errors/GetItemsError'
import GameListSkeleton from '@/components/skeletons/GamesListSkeleton'


export default function GamesList() {

		const [ games, setGames ] = useState<GameWithId[]>()
		const { getGames, removeGame } = useGamesActions()

		const { data, loading, error } = useAppSelector(state => state.games)

		useEffect(() => {
			if ( !data.length ) {
				getGames()
			}
		}, [])

		useEffect(() => {
			setGames(data)
		}, [ data ])

		if (loading) return <GameListSkeleton />
		if (error) return <GetItemsError error='Error al cargar los juegos' />

	return (
		<ul className="border-b-2 w-full border-b-gray-500 pb-5 flex flex-col items-center gap-3 h-60 overflow-y-scroll">
			{
				games?.map(game => (
				<li className="flex gap-4 items-center border-b-1 border-b-gray-200 py-5">
					<img className="rounded-sm w-30 xl:w-40 2xl:w-70" src={ game.imgUri }alt="" />
					<form className="flex flex-col gap-2 text-sm" action="">
						<div className="flex flex-col">
							<label className="font-semibold" htmlFor="">Nombre:</label>
							<input value={ game.name } className="border-b-1 border-b-gray-300 bg-gray-200 rounded-sm px-2 py-1" type="text" placeholder="Nombre del juego" />
						</div>
						<div className="flex flex-col">
							<label className="font-semibold" htmlFor="">URL:</label>
							<input value={ game.url } className="border-b-1 border-b-gray-300 bg-gray-200 rounded-sm px-2 py-1" type="text" placeholder="Nombre del juego" />
						</div>
						<div className="flex flex-col">
							<label className="font-semibold" htmlFor="">URL de la imagen:</label>
							<input value={ game.imgUri ?? '' } className="border-b-1 border-b-gray-300 bg-gray-200 rounded-sm px-2 py-1" type="text" placeholder="Nombre del juego" />
						</div>
					</form>
					<div className="flex flex-col gap-4">
						<button onClick={ () => removeGame(game._id) } className="bg-red-500 text-white px-3 rounded-sm font-bold py-1">Eliminar</button>
						<button className="bg-yellow-500 text-white px-3 rounded-sm font-bold py-1">Editar</button>
					</div>
				</li>
				))
			}
		</ul>
	)
}
