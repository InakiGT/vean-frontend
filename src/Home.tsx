import Layout from '@/components/Layout'
import CoursesList from '@/components/CoursesList'

export default function Home() {
	return (
		<Layout>
			<main className="my-0 w-full h-fit pt-10">
				<h2 className="text-3xl font-bold text-center mb-10">Materias</h2>

				<section className="w-2/5 mx-auto flex flex-col items-center">
					<CoursesList />

					<div className="w-full flex justify-center gap-4 mx-auto mt-5">
						<input type="text" placeholder="Nueva materia" className="border-2 border-gray-300 rounded-sm text-center text-sm px-10" />
						<button className="bg-green-800 rounded-sm flex py-2 px-3 justify-between gap-3 text-white uppercase hover:bg-green-900 hover:drop-shadow-md transition-all cursor-pointer"><span>+</span> Agregar materia</button>
					</div>
				</section>
			</main>
		</Layout>
	)
}
