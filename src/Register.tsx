import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import config from '@/config'

const URI = `${ config.serverUri }/user`

export default function Register() {
	const [ error, setError ] = useState('')
	const [ emailError, setEmailError ] = useState(false)
	const [ passwordError, setPasswordError ] = useState(false)
	const [ repeatPasswordError, setRepeatPasswordError ] = useState(false)

	const navigator = useNavigate()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setEmailError(false)
		setPasswordError(false)
		setRepeatPasswordError(false)

		const form = event.target as HTMLFormElement
		const formData = new FormData(form)

		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const repeatPassword = formData.get('repeat-password') as string

		if ( email.trim() === '' ) return setEmailError(true)
		if ( password.trim() === '' ) return setPasswordError(true)
		if ( repeatPassword.trim() === '' ) return setRepeatPasswordError(true)
		if ( repeatPassword !== password ) {
			setPasswordError(true)
			setRepeatPasswordError(true)

			return
		}

		const newUser = {
			email,
			password,
		}

		try {
			const response = await fetch(URI, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ...newUser }),
			})

			if ( response.status === 201 ) {
				return navigator('/login')
			} else {
				return setError('Error en el registro')
			}
		} catch {
			setError('Ocurrió un error inesperado')
		}
	}

	return (
		<Layout>
			<main>
				<form onSubmit={ handleSubmit } className='flex flex-col px-60 py-15 w-1/2 gap-4 mx-auto drop-shadow-sm bg-gray-100 rounded-sm items-center text-2xl mt-30'>
					<div className='flex flex-col w-full'>
						<label className='font-bold' htmlFor="email">Correo:</label>
						<input className={`px-3 py-2 text-xl rounded-sm bg-gray-200 border-b-1 border-b-gray-300 ${ emailError && 'border-b-red-400 animate-pulse' }`} id='email' type="email" placeholder='Correo' name='email' />
					</div>
					<div className='flex flex-col w-full'>
						<label className='font-bold' htmlFor="password">Contraseña:</label>
						<input className={`px-3 py-2 text-xl rounded-sm bg-gray-200 border-b-1 border-b-gray-300 ${ passwordError && 'border-b-red-400 animate-pulse' }`} type="password" id='password' placeholder='Contraseña' name='password' />
					</div>
					<div className='flex flex-col w-full'>
						<label className='font-bold' htmlFor="password">Repetir contraseña:</label>
						<input className={`px-3 py-2 text-xl rounded-sm bg-gray-200 border-b-1 border-b-gray-300 ${ repeatPasswordError && 'border-b-red-400 animate-pulse' }`} type="password" id='password' placeholder='Contraseña' name='repeat-password' />
					</div>
					{
						error &&
						<span className='bg-red-400 text-white font-bold text-md w-full text-center rounded-sm'>{ error }</span>
					}
					<button className='bg-blue-900 text-white w-50 rounded-sm uppercase py-2 mt-4 text-lg cursor-pointer hover:bg-blue-950 transition-colors' type='submit'>Registrarse</button>

					<div className='flex flex-col mt-5 text-blue-900 gap-2'>
						<Link className='cursor-pointer text-sm' to='/login'>¿Ya tienes una cuenta? Iniciar sesión</Link>
					</div>
				</form>
			</main>
		</Layout>
	)
}
