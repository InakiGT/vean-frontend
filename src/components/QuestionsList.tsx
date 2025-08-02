import QuestionItem from '@/components/QuestionItem'
import { QuestionWithId } from '@/store/questions/types'

export default function QuestionsList({ questions }: { questions: QuestionWithId[] | undefined }) {
	return (
		<ul className='flex flex-col gap-4 px-2'>
			{
				questions?.map(question => (
					<QuestionItem key={ question._id } question={ question } />
				))
			}
		</ul>
	)
}
