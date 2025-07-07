import Layout from '@/components/Layout'
import CoursesList from '@/components/CoursesList'
import Backward from '@/components/Icons/BackwardIcon'
import { Link } from 'react-router-dom'

export default function Course() {
	return (
		<Layout>
			<main className="my-0 w-full px-20 h-fit pt-10">
				<Link to='/'>
					<Backward classes='w-10 h-10 text-black cursor-pointer hover:-translate-x-1 transition-all' />
				</Link>
				<h2 className="text-3xl font-bold text-center mb-3">Materia: <span contentEditable="true">Administración de proyectos</span></h2>
				<h3 className="text-center text-2xl font-bold mb-10">Temas</h3>

				<section className="w-2/5 mx-auto flex flex-col items-center">
					<CoursesList />

					<div className="w-full flex justify-center gap-4 mx-auto mt-5">
						<input type="text" placeholder="Nuevo tema" className="border-2 border-gray-300 rounded-sm text-center text-sm px-10" />
						<button className="bg-green-800 rounded-sm flex py-2 px-3 justify-between gap-3 text-white uppercase hover:bg-green-900 hover:drop-shadow-md transition-all cursor-pointer"><span>+</span> Agregar tema</button>
					</div>
				</section>
			</main>
		</Layout>
	)
}
