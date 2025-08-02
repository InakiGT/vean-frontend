import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from '@/config'
import Layout from '@/components/Layout'
import { useQuestionsActions } from '@/hooks/useQuestionsActions'
import type { Question } from '@/store/questions/types'

const URI = `${ config.serverUri }/question/open`

export default function Question() {
	const navigate = useNavigate()
	const params = useParams()
	const { changeQuestion } = useQuestionsActions()

	const [ result, setResult ] = useState<'ko' | 'ok' | null>(null)
	const [ questionInfo, setQuestionInfo ] = useState<Question | null>(null)

	const handleQuestion = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const form = event.target as HTMLFormElement
		const formData = new FormData(form)

		const question = formData.get('question') as string
		const answer = formData.get('answer') as string
		const theme = questionInfo?.theme || ''

		if ( question.trim() === '' || answer.trim() === '' || !theme ) {
			return setResult('ko')
		}

		changeQuestion({
			_id: params.id ?? '',
			theme,
			question,
			answer,
		})

		navigate(-1)
	}

	useEffect(() => {
		const fetchQuestion = async () => {
			const response = await fetch(`${URI}/${params.id}`)
			const data = await response.json()

			setQuestionInfo(data.data)
		}

		fetchQuestion()
	}, [])

	return (
		<Layout>
			<div className='w-1/2 mx-auto mt-10 rounded-sm'>
			<form onSubmit={ handleQuestion } className='w-full bg-gray-200 py-5 px-4 rounded-b-sm flex flex-col gap-5'>
				<div className='flex flex-col gap-1 text-xl'>
					<label htmlFor="question">Pregunta:</label>
					<input
						name='question'
						id='question'
						onChange={event =>
							setQuestionInfo(prev =>
								prev
									? { ...prev, question: event.target.value }
									: { question: event.target.value, answer: '', theme: '', answers: [], correctAnswer: '' }
							)
						}
						value={questionInfo?.question || ''}
						type="text"
						className='border-b-gray-400 border-b-1 px-3 py-2'
						placeholder='Pregunta'
					/>
				</div>
				<div className='flex flex-col gap-1 text-xl'>
					<label htmlFor="question">Respuesta:</label>
					<input
						name='answer'
						id='answer'
						onChange={event =>
							setQuestionInfo(prev =>
								prev
									? { ...prev, answer: event.target.value }
									: { question: '', answer: event.target.value, theme: '', answers: [], correctAnswer: '' }
							)
						}
						value={questionInfo?.answer || ''}
						type="text"
						className='border-b-gray-400 border-b-1 px-3 py-2'
						placeholder='Respuesta'
					/>
				</div>
				{
					result === 'ko' &&
					<span className='text-center text-white bg-red-400 rounded-sm font-semibold'>Los campos no pueden ir vacíos</span>
				}
				<button type="submit" className="bg-green-800 rounded-sm flex py-2 px-3 justify-center gap-3 text-white uppercase hover:bg-green-900 hover:drop-shadow-md transition-all cursor-pointer"><span>+</span> Actualizar pregunta</button>
			</form>
			</div>
		</Layout>
	)
}
