import { Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import Backward from '@/components/Icons/BackwardIcon'
import EditIcon from './components/Icons/EditIcon'
import Questions from './components/Questions'
import QuestionsSum from './components/QuestionsSum'

export default function Theme() {
	return (
		<Layout>
			<main className="my-0 w-full px-20 h-fit pt-10">
				<Link to='/'>
					<Backward classes='w-10 h-10 text-black cursor-pointer hover:-translate-x-1 transition-all' />
				</Link>
				<h3 className="text-center text-xl font-light mb-1">Materia: Administración de Proyectos</h3>
				<h2 className="text-3xl font-bold text-center mb-3 flex items-center gap-2 justify-center">Tema: <span className='text-gray-900' contentEditable="true">Métodos de Comunicación</span><EditIcon classes='w-6 h-6 cursor-pointer' /></h2>

				<div className="w-2/5 mx-auto flex flex-col items-center">

					<Questions />

					<section className="w-full flex flex-col items-center mx-auto mt-5 mb-10">
						<h3 className='font-bold text-2xl mb-2'>Agregar una pregunta</h3>
						<div className='w-full flex gap-3 items-center'>
							<p className='bg-gray-200 py-2 px-3 font-medium rounded-t-lg'>Pregunta / Respuesta</p>
							<p>Opción múltiple</p>
						</div>

						{/* TODO: Poner en su propio componente */}
						<form className='w-full bg-gray-200 py-5 px-4 rounded-b-sm flex flex-col gap-5' action="">
							<div className='flex flex-col gap-1 text-xl'>
								<label htmlFor="question">Pregunta:</label>
								<input id='question' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Pregunta' />
							</div>
							<div className='flex flex-col gap-1 text-xl'>
								<label htmlFor="question">Respuesta:</label>
								<input id='question' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Respuesta' />
							</div>
							<button className="bg-green-800 rounded-sm flex py-2 px-3 justify-center gap-3 text-white uppercase hover:bg-green-900 hover:drop-shadow-md transition-all cursor-pointer"><span>+</span> Guardar pregunta</button>
						</form>
					</section>

					<section className='w-full mb-5'>
						<h3 className='font-bold text-2xl mb-2 text-center'>Resumen de preguntas</h3>
						<QuestionsSum />
					</section>
				</div>
			</main>
		</Layout>
	)
}
