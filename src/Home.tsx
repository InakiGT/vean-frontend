import { useState } from 'react'
import Layout from '@/components/Layout'
import CoursesList from '@/components/CoursesList'
import { useCoursesActions } from '@/hooks/useCoursesActions'

export default function Home() {
	const { addCourse } = useCoursesActions()

	const [ result, setResult ] = useState<'ok' | 'ko' | null>(null)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const form = event.target as HTMLFormElement
		const formData = new FormData(form)

		const name = formData.get('name') as string

		if ( !name.trim() ) {
			return setResult('ko')
		}

		addCourse({ name })
		setResult('ok')
		form.reset()
	}

	return (
		<Layout>
			<main className="my-0 w-full h-fit pt-10">
				<h2 className="text-3xl font-bold text-center mb-10">Materias</h2>

				<section className="w-2/5 mx-auto flex flex-col items-center">
					<CoursesList />

					<form onSubmit={ handleSubmit } className="w-full flex justify-center gap-4 mx-auto mt-5">
						<input type="text" id='name' name='name' placeholder="Nueva materia" className="border-2 border-gray-300 rounded-sm text-center text-sm px-10" />
						<button className="bg-green-800 rounded-sm flex py-2 px-3 justify-between gap-3 text-white uppercase hover:bg-green-900 hover:drop-shadow-md transition-all cursor-pointer"><span>+</span> Agregar materia</button>
					</form>
					{ result === 'ko' &&
						<p className='mt-2 bg-red-400 text-white font-bold w-110 py-2 text-center rounded-sm'>El nombre de la materia no puede ir vacío</p>
					}
				</section>
			</main>
		</Layout>
	)
}
