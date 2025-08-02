import { useAppDispatch } from '@/hooks/store'
import { Question, QuestionId, QuestionWithId } from '@/store/questions/types'
import { fetchCourseWithThemes } from '@/thunks/course.thunk'
import { createQuestion, deleteQuestion, updateQuestion } from '@/thunks/question.thunk'

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

	const changeQuestion = (question: QuestionWithId) => {
		return dispatch(updateQuestion(question))
	}

	return { getQuestionById, addQuestion, removeQuestion, changeQuestion }
}
