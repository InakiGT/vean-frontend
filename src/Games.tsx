import { useState } from 'react'
import Layout from '@/components/Layout'
import { Link } from 'react-router-dom'
import BackwardIcon from '@/components/Icons/BackwardIcon'
import GamesList from '@/components/GamesList'
import { useGamesActions } from '@/hooks/useGamesActions'

export default function Games() {
	const [ result, setResult ] = useState<'ok' | 'ko' | null>(null)
	const [ photo, setPhoto ] = useState<string | null>(null)

	const { addGame } = useGamesActions()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const form = event.target as HTMLFormElement
		const formData = new FormData(form)

		const name = formData.get('name') as string
		const url = formData.get('url') as string
		const imgUri = formData.get('img-uri') as string

		if ( name.trim() === '' || url.trim() === '' || imgUri.trim() === ''  ) {
			return setResult('ko')
		}

		addGame({
			name,
			url,
			imgUri,
		})

		setResult('ok')
		form.reset()
		setPhoto(null)
	}

	return (
		<Layout>
			<main className="my-0 w-full px-20 h-fit pt-10">
				<Link to='/'>
					<BackwardIcon className='w-10 h-10 text-black cursor-pointer hover:-translate-x-1 transition-all' />
				</Link>
				<h2 className="text-3xl font-bold text-center mb-3 flex items-center justify-center gap-2">Juegos</h2>
				<section className="w-2/5 mx-auto flex flex-col items-center mb-10">
					<GamesList />

					<div className='flex gap-5 mt-5 items-center'>
						<img className="rounded-sm w-70 h-full" src={ photo ? photo : 'https://static.thenounproject.com/png/1034957-200.png' } alt="" />
						<form className="flex flex-col gap-2 text-sm w-50" onSubmit={ handleSubmit }>
							<div className="flex flex-col">
								<label className="font-semibold" htmlFor="">Nombre:</label>
								<input className="border-b-1 border-b-gray-300 bg-gray-200 rounded-sm px-2 py-1" name='name' type="text" placeholder="Nombre del juego" />
							</div>
							<div className="flex flex-col">
								<label className="font-semibold" htmlFor="">URL:</label>
								<input className="border-b-1 border-b-gray-300 bg-gray-200 rounded-sm px-2 py-1" name='url' type="url" placeholder="Nombre del juego" />
							</div>
							<div className="flex flex-col">
								<label className="font-semibold" htmlFor="">URL de la imagen:</label>
								<input className="border-b-1 border-b-gray-300 bg-gray-200 rounded-sm px-2 py-1" name='img-uri' type="url" onChange={ event => setPhoto(event.target.value) } placeholder="Nombre del juego" />
							</div>
							<button type='submit' className="bg-green-800 rounded-sm flex py-2 px-3 justify-between gap-3 text-white uppercase hover:bg-green-900 hover:drop-shadow-md transition-all cursor-pointer text-center"><span>+</span> Agregar juego</button>
						</form>
					</div>
						{ result === 'ko' &&
							<p className='mt-2 bg-red-400 text-white font-bold w-full py-2 text-center rounded-sm'>Los campos no pueden ir vacíos</p>
						}
				</section>
			</main>
		</Layout>
	)
}
