import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuestionsActions } from '@/hooks/useQuestionsActions'

export default function MultipleChoiceQuestionForm() {
	const params = useParams()
	const { addQuestion } = useQuestionsActions()

	const [ result, setResult ] = useState<'ko' | 'ok' | null>(null)

	const handleQuestion = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setResult(null)

		const form = event.target as HTMLFormElement
		const formData = new FormData(form)

		const answersObject = {
			answerA: formData.get('answer-a') as string,
			answerB: formData.get('answer-b') as string,
			answerC: formData.get('answer-c') as string,
			answerD: formData.get('answer-d') as string,
		}
		const question = formData.get('question') as string
		const correctAnswerSelected = formData.get('correct-answer') as string
		const theme = params.id
		const answers = [ answersObject.answerA, answersObject.answerB, answersObject.answerC, answersObject.answerD ]
		const correctAnswer = answersObject[correctAnswerSelected]

		if ( question.trim() === '' || answers.includes('') || !theme ) {
			return setResult('ko')
		}

		addQuestion({
			theme,
			question,
			answers,
			correctAnswer,
		})

		setResult('ok')
		form.reset()
	}
	return (
		<form onSubmit={ handleQuestion } className='w-full bg-gray-200 py-5 px-4 rounded-b-sm flex flex-col gap-5' action="">
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="question">Pregunta:</label>
				<input name="question" id='question' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Pregunta' />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="answer-a">Respuesta A:</label>
				<input name='answer-a' id='answer-a' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Respuesta' />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="answer-b">Respuesta B:</label>
				<input name='answer-b' id='answer-b' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Respuesta' />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="answer-c">Respuesta C:</label>
				<input name='answer-c' id='answer-c' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Respuesta' />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="answer-d">Respuesta D:</label>
				<input name='answer-d' id='answer-d' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Respuesta' />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="correct-answer">Respuesta Correcta:</label>
				<select name="correct-answer" id="correct-answer" className='border-b-gray-400 border-b-1 px-3 py-2'>
					<option value="answerA">Respuesta A</option>
					<option value="answerB">Respuesta B</option>
					<option value="answerC">Respuesta C</option>
					<option value="answerD">Respuesta D</option>
				</select>
			</div>
			{
				result === 'ko' &&
				<span className='text-center text-white bg-red-400 rounded-sm font-semibold'>Los campos no pueden ir vacíos</span>
			}
			<button className="bg-green-800 rounded-sm flex py-2 px-3 justify-center gap-3 text-white uppercase hover:bg-green-900 hover:drop-shadow-md transition-all cursor-pointer"><span>+</span> Guardar pregunta</button>
		</form>
	)
}
