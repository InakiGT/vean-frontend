import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import ThemesList from '@/components/ThemesList'
import EditIcon from '@/components/Icons/EditIcon'
import { Link, useParams } from 'react-router-dom'
import { CourseWithId } from '@/store/courses/types'
import Backward from '@/components/Icons/BackwardIcon'
import { useCoursesActions } from '@/hooks/useCoursesActions'
import { useAppSelector } from '@/hooks/store'
import TitleSkeleton from '@/components/skeletons/TitleSkeleton'
import { useThemesActions } from '@/hooks/useThemesActions'


export default function Course() {
	const params = useParams()
	const { getCourseById } = useCoursesActions()
	const { addTheme } = useThemesActions()

	const [ course, setCourse ] = useState<CourseWithId>()
	const [ result, setResult ] = useState<'ok' | 'ko' | 'kos' | null>()
	const { data, loading, error } = useAppSelector(state => state.themes)


	useEffect(() => {
		getCourseById(params.id ?? '')
	}, [])

	useEffect(() => {
		setCourse(data)
	}, [ data ])

	const handleUpdate = () => {}
	const handleCreateTheme = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const form = event.target as HTMLFormElement
		const formData = new FormData(form)

		const name = formData.get('name') as string

		if ( name.trim() === '' ) {
			return setResult('ko')
		}

		addTheme({
			name,
			course: course?._id || '',
		})
	}

	return (
		<Layout>
			<main className="my-0 w-full px-20 h-fit pt-10">
				<Link to='/'>
					<Backward className='w-10 h-10 text-black cursor-pointer hover:-translate-x-1 transition-all' />
				</Link>
				<h2 className="text-3xl font-bold text-center mb-3 flex items-center justify-center gap-2">
					Materia: <span contentEditable="true" onBlur={ handleUpdate }>
						{ loading && <TitleSkeleton /> }
						{ course?.name }
					</span>
					<EditIcon className='w-6 h-6 text-blue-400 cursor-pointer' />
				</h2>
				<h3 className="text-center text-2xl font-bold mb-10">Temas</h3>

				<section className="w-2/5 mx-auto flex flex-col items-center">
					<ThemesList loading={ loading } error={ error } themes={ course?.themes } />

					<form onSubmit={ handleCreateTheme } className="w-full flex justify-center gap-4 mx-auto mt-5">
						<input type="text" placeholder="Nuevo tema" name='name' className="border-2 border-gray-300 rounded-sm text-center text-sm px-10" />
						<button type='submit' className="bg-green-800 rounded-sm flex py-2 px-3 justify-between gap-3 text-white uppercase hover:bg-green-900 hover:drop-shadow-md transition-all cursor-pointer"><span>+</span> Agregar tema</button>
					</form>
					{ result === 'kos' &&
						<p className='mt-2 bg-red-400 text-white font-bold w-110 py-2 text-center rounded-sm'>Error en el servidor</p>
					}
					{ result === 'ko' &&
						<p className='mt-2 bg-red-400 text-white font-bold w-110 py-2 text-center rounded-sm'>El nombre del tema no puede ir vacío</p>
					}
				</section>
			</main>
		</Layout>
	)
}
