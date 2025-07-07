import QuestionIcon from '@/components/Icons/QuestionIcon'
import EditIcon from '@/components/Icons/EditIcon'
import DeleteIcon from '@/components/Icons/DeleteIcon'

export default function QuestionItem() {
	return (
		<li className='flex items-center font-normal gap-2 overflow-hidden max-w-full'>
			<QuestionIcon classes='w-6 h-6' />
			<span className='w-70 text-left overflow-x-scroll whitespace-nowrap font-light px-2 py-1 bg-gray-200 rounded-t-sm'>¿Qué es aquello y qué es lo otroasdasdasdasdasdasdasdjaskdjaskdjaskjdaksldklasjdaklssdjlsaasd?</span>
			<EditIcon classes='w-6 h-6 cursor-pointer text-green-500' />
			<DeleteIcon classes='w-6 h-6 text-red-600 cursor-pointer' />
		</li>
	)
}
