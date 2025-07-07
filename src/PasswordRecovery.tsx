import { Link } from 'react-router-dom'
import BackwardIcon from '@/components/Icons/BackwardIcon'
import Layout from '@/components/Layout'

export default function PasswordRecovery() {
	return (
		<Layout>
			<main className="w-1/2 mx-auto mt-30">
				<Link to="/login">
					<BackwardIcon classes="w-8 h-8 mb-3 hover:-translate-x-1 transition-all cursor-pointer" />
				</Link>
				<form className='flex flex-col px-60 py-15 gap-4 mx-auto drop-shadow-sm bg-gray-100 rounded-sm items-center text-2xl'>
					<span className="text-sm text-center text-red-500">¡Importante! <br />Si el correo no aparece en tu bandeja de entrada, no olvides revisar la carpeta de correo no deseado o spam.</span>
					<div className='flex flex-col w-full'>
						<label className='font-bold' htmlFor="email">Correo registrado:</label>
						<input className='px-3 py-2 text-xl rounded-sm bg-gray-200 border-b-1 border-b-gray-300' id='email' type="email" placeholder='Correo' />
					</div>
					<button className='bg-blue-900 text-white w-50 rounded-sm uppercase py-2 mt-4 text-lg' type='submit'>Enviar correo</button>
				</form>
			</main>
		</Layout>
	)
}
