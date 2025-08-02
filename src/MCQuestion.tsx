import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from '@/config'
import Layout from '@/components/Layout'
import { useQuestionsActions } from '@/hooks/useQuestionsActions'
import type { Question } from '@/store/questions/types'

const URI = `${ config.serverUri }/question/multipleChoice`

export default function MCQuestion() {
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
	   const answerA = formData.get('answer-a') as string
	   const answerB = formData.get('answer-b') as string
	   const answerC = formData.get('answer-c') as string
	   const answerD = formData.get('answer-d') as string
	   const correctAnswer = formData.get('correct-answer') as string
	   const theme = questionInfo?.theme || ''

	   if (
		   question.trim() === '' ||
		   answerA.trim() === '' ||
		   answerB.trim() === '' ||
		   answerC.trim() === '' ||
		   answerD.trim() === '' ||
		   correctAnswer.trim() === '' ||
		   !theme
	   ) {
		   return setResult('ko')
	   }

	   changeQuestion({
		   _id: params.id ?? '',
		   theme,
		   question,
		   answers: [answerA, answerB, answerC, answerD],
		   correctAnswer,
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
		<form onSubmit={ handleQuestion } className='w-full bg-gray-200 py-5 px-4 rounded-b-sm flex flex-col gap-5' action="">
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="question">Pregunta:</label>
	   <input name="question" id='question' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Pregunta' value={questionInfo?.question || ''} onChange={e => setQuestionInfo(q => q ? { ...q, question: e.target.value } : null)} />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="answer-a">Respuesta A:</label>
	   <input name='answer-a' id='answer-a' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Respuesta' value={questionInfo?.answers?.[0] || ''} onChange={e => setQuestionInfo(q => q ? { ...q, answers: q.answers ? [e.target.value, q.answers[1] || '', q.answers[2] || '', q.answers[3] || ''] : [e.target.value, '', '', ''] } : null)} />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="answer-b">Respuesta B:</label>
	   <input name='answer-b' id='answer-b' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Respuesta' value={questionInfo?.answers?.[1] || ''} onChange={e => setQuestionInfo(q => q ? { ...q, answers: q.answers ? [q.answers[0] || '', e.target.value, q.answers[2] || '', q.answers[3] || ''] : ['', e.target.value, '', ''] } : null)} />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="answer-c">Respuesta C:</label>
	   <input name='answer-c' id='answer-c' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Respuesta' value={questionInfo?.answers?.[2] || ''} onChange={e => setQuestionInfo(q => q ? { ...q, answers: q.answers ? [q.answers[0] || '', q.answers[1] || '', e.target.value, q.answers[3] || ''] : ['', '', e.target.value, ''] } : null)} />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="answer-d">Respuesta D:</label>
	   <input name='answer-d' id='answer-d' type="text" className='border-b-gray-400 border-b-1 px-3 py-2' placeholder='Respuesta' value={questionInfo?.answers?.[3] || ''} onChange={e => setQuestionInfo(q => q ? { ...q, answers: q.answers ? [q.answers[0] || '', q.answers[1] || '', q.answers[2] || '', e.target.value] : ['', '', '', e.target.value] } : null)} />
			</div>
			<div className='flex flex-col gap-1 text-xl'>
				<label htmlFor="correct-answer">Respuesta Correcta:</label>
	   <select name="correct-answer" id="correct-answer" className='border-b-gray-400 border-b-1 px-3 py-2' value={questionInfo?.correctAnswer || ''} onChange={e => setQuestionInfo(q => q ? { ...q, correctAnswer: e.target.value } : null)}>
		   {questionInfo?.answers?.map((ans, idx) => (
			   <option key={idx} value={ans}>{`Respuesta ${String.fromCharCode(65 + idx)}`}</option>
		   ))}
	   </select>
			</div>
			{
				result === 'ko' &&
				<span className='text-center text-white bg-red-400 rounded-sm font-semibold'>Los campos no pueden ir vacíos</span>
			}
			<button className="bg-green-800 rounded-sm flex py-2 px-3 justify-center gap-3 text-white uppercase hover:bg-green-900 hover:drop-shadow-md transition-all cursor-pointer"><span>+</span> Actualizar pregunta</button>
		</form>
			</div>
		</Layout>
	)
}
