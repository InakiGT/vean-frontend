import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import Backward from '@/components/Icons/BackwardIcon'
import EditIcon from '@/components/Icons/EditIcon'
import Questions from '@/components/Questions'
import QuestionsSum from '@/components/QuestionsSum'
import { useThemesActions } from '@/hooks/useThemesActions'
import { ThemeWithId } from '@/store/themes/types'
import { useAppSelector } from '@/hooks/store'
import TitleSkeleton from '@/components/skeletons/TitleSkeleton'
import OpenQuestionForm from '@/components/OpenQuestionForm'
import MultipleChoiceQuestionForm from '@/components/MultipleChoiceQuestionForm'

export default function Theme() {
	const params = useParams()
	const navigator = useNavigate()
	const { getThemeWithId, changeTheme } = useThemesActions()

	const [ theme, setTheme ] = useState<ThemeWithId>()
	const [ selectedForm, setSelectedForm ] = useState<'open' | 'mc'>('open')
	const { data, loading, error } = useAppSelector(state => state.questions)

	useEffect(() => {
		getThemeWithId(params.id ?? '')
	}, [])

	useEffect(() => {
		setTheme(data)
	}, [ data ])

	const handleUpdate = (event: React.FormEvent<HTMLSpanElement>) => {
		const name = event.currentTarget.textContent ?? ''
		const { id } = params

		if ( name?.trim() === '' ) return

		changeTheme({
			course: '',
			_id: id ?? '',
			name,
		})
	}

	if (error) return <p>ERROR</p>

	return (
		<Layout>
			<main className="my-0 w-full px-20 h-fit pt-10">
				<span onClick={ () => navigator(-1) }>
					<Backward className='w-10 h-10 text-black cursor-pointer hover:-translate-x-1 transition-all' />
				</span>
				<h3 className="text-center text-xl flex items-center justify-center font-light mb-1">
					Materia:  { loading ? <TitleSkeleton /> : theme?.course }
				</h3>
				<h2 className="text-3xl font-bold text-center mb-3 flex items-center gap-2 justify-center">
					Tema:
					<span className='text-gray-900' contentEditable="true" onBlur={ handleUpdate }>{ loading ? <TitleSkeleton /> : theme?.name}</span>
					<EditIcon className='w-6 h-6 text-blue-400 cursor-pointer' />
				</h2>

				<div className="w-2/5 mx-auto flex flex-col items-center">

					<Questions loading={ loading } questions={{ openQuestions: theme?.openQuestions, mcQuestions: theme?.mcQuestions }} />

					<section className="w-full flex flex-col items-center mx-auto mt-5 mb-10">
						<h3 className='font-bold text-2xl mb-2'>Agregar una pregunta</h3>
						<div className='w-full flex gap-3 items-center'>
							<p className={`cursor-pointer ${ selectedForm === 'open' && 'bg-gray-200 py-2 px-3 font-medium rounded-t-lg' }`} onClick={ () => setSelectedForm('open') }>Pregunta / Respuesta</p>
							<p className={`cursor-pointer ${ selectedForm === 'mc' && 'bg-gray-200 py-2 px-3 font-medium rounded-t-lg' }`} onClick={ () => setSelectedForm('mc') }>Opción múltiple</p>
						</div>

						{
							selectedForm === 'open' ? <OpenQuestionForm /> : <MultipleChoiceQuestionForm />
						}
					</section>

					<section className='w-full mb-5'>
						<h3 className='font-bold text-2xl mb-2 text-center'>Resumen de preguntas</h3>
						<QuestionsSum questions={{ openQuestions: theme?.openQuestions, mcQuestions: theme?.mcQuestions }} />
					</section>
				</div>
			</main>
		</Layout>
	)
}
