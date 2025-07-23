import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuestionsActions } from '@/hooks/useQuestionsActions'

export default function OpenQuestionForm() {
	const params = useParams()
	const { addQuestion } = useQuestionsActions()

	const [ result, setResult ] = useState<'ko' | 'ok' | null>(null)

	const handleQuestion = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const form = event.target as HTMLFormElement
		const formData = new FormData(form)

		const question = formData.get('question') as string
		const answer = formData.get('answer') as string
		const theme = params.id

		if ( question.trim() === '' || answer.trim() === '' || !theme ) {
			return setResult('ko')
		}

		addQuestion({
			theme,
			question,
			answer,
		})

		form.reset()
	}

	return (
		<form onSubmit={ handleQuestion } className='w-full bg-gray-200 py-5 px-4 rounded-b-sm flex flex-col gap-5' action="">
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="question">Pregunta:</label>
				<input name='question' id='question' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Pregunta' />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="question">Respuesta:</label>
				<input name='answer' id='question' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Respuesta' />
			</div>
			{
				result === 'ko' &&
				<span className='text-center text-white bg-red-400 rounded-sm font-semibold'>Los campos no pueden ir vacíos</span>
			}
			<button type="submit" className="bg-green-800 rounded-sm flex py-2 px-3 justify-center gap-3 text-white uppercase hover:bg-green-900 hover:drop-shadow-md transition-all cursor-pointer"><span>+</span> Guardar pregunta</button>
		</form>
	)
}
