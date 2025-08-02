import { useNavigate } from 'react-router-dom'
import QuestionIcon from '@/components/Icons/QuestionIcon'
import EditIcon from '@/components/Icons/EditIcon'
import DeleteIcon from '@/components/Icons/DeleteIcon'
import { QuestionWithId } from '@/store/questions/types'
import { useQuestionsActions } from '@/hooks/useQuestionsActions'

export default function QuestionItem({ question }: { question: QuestionWithId }) {
	const navigate = useNavigate()
	const { removeQuestion } = useQuestionsActions()

	return (
		<li className='flex items-center font-normal gap-2 overflow-hidden max-w-full'>
			<QuestionIcon className='w-6 h-6' />
			<span className='w-70 text-left overflow-x-scroll whitespace-nowrap font-light px-2 py-1 bg-gray-200 rounded-t-sm'>{ question.question }</span>
			<EditIcon onClick={ () => navigate(`/question/${ question.answer ? 'open' : 'mc'}/${ question._id }`) } className='w-8 h-8 cursor-pointer text-green-500' />
			<DeleteIcon className='w-8 h-8 text-red-600 cursor-pointer' onClick={ () => removeQuestion({ id: question._id, type: question.answer ? 'open' : 'mc' }) } />
		</li>
	)
}
