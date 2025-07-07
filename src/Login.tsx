import Layout from '@/components/Layout'
import { Link } from 'react-router-dom'

export default function Login() {
	return (
		<Layout>
			<main>
				<form className='flex flex-col px-60 py-15 w-1/2 gap-4 mx-auto drop-shadow-sm bg-gray-100 rounded-sm items-center text-2xl mt-30'>
					<div className='flex flex-col w-full'>
						<label className='font-bold' htmlFor="email">Correo:</label>
						<input className='px-3 py-2 text-xl rounded-sm bg-gray-200 border-b-1 border-b-gray-300' id='email' type="email" placeholder='Correo' />
					</div>
					<div className='flex flex-col w-full'>
						<label className='font-bold' htmlFor="password">Contraseña:</label>
						<input className='px-3 py-2 text-xl rounded-sm bg-gray-200 border-b-1 border-b-gray-300' type="password" id='password' placeholder='Contraseña' />
					</div>
					<button className='bg-blue-900 text-white w-50 rounded-sm uppercase py-2 mt-4 text-lg' type='submit'>Iniciar sesión</button>

					<div className='flex flex-col mt-5 text-blue-900 gap-2'>
						<Link className='cursor-pointer text-sm' to='/password-recovery'>Olvidé mi contraseña</Link>
						<Link className='cursor-pointer text-sm' to='/register'>¿No tienes una cuenta? Registrarse</Link>
					</div>
				</form>
			</main>
		</Layout>
	)
}
