import { MultipleQuestion } from '@/store/questions/types'

export default function QuestionsSum({ questions }: { questions: MultipleQuestion }) {
	return (
		<ul className="flex h-100 overflow-y-scroll flex-col gap-3">
			{
				questions.openQuestions?.map(question => (
				<li className="border-b-gray-300 border-b-1 px-2 py-1">
					<p className="font-medium">{ question.question }</p>
					<p>{ question.answer }</p>
				</li>
				))
			}
			{
				questions.mcQuestions?.map(question => (
				<li className="border-b-gray-300 border-b-1 px-2 py-1">
					<p className="font-medium">{ question.question }</p>
					<ul className='list-decimal pl-5'>
						{
							question.answers?.map(answer =>
								<li className={`${question.correctAnswer === answer && 'text-green-800 font-semibold'}` }>{ answer }</li>
							)
						}
					</ul>
				</li>
				))
			}
		</ul>
	)
}
