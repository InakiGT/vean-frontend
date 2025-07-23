import { useAppDispatch } from '@/hooks/store'
import { Question, QuestionId } from '@/store/questions/types'
import { fetchCourseWithThemes } from '@/thunks/course.thunk'
import { createQuestion, deleteQuestion } from '@/thunks/question.thunk'

export const useQuestionsActions = () => {
	const dispatch = useAppDispatch()

	const getQuestionById = (id: QuestionId) => {
		return dispatch(fetchCourseWithThemes(id))
	}

	const addQuestion = (question: Question) => {
		return dispatch(createQuestion(question))
	}

	const removeQuestion = (deleteOptions: { id: string, type: 'open' | 'mc' }) => {
		return dispatch(deleteQuestion(deleteOptions))
	}

	return { getQuestionById, addQuestion, removeQuestion }
}
