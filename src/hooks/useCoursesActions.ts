import { useAppDispatch } from '@/hooks/store'
import { Course, CourseId } from '@/store/courses/types'
import { createCourse, deleteCourse, fetchCourses, fetchCourseWithThemes } from '@/thunks/course.thunk'

export const useCoursesActions = () => {
	const dispatch = useAppDispatch()

	const getCourses = () => {
		dispatch(fetchCourses())
	}

	const getCourseById = (id: CourseId) => {
		dispatch(fetchCourseWithThemes(id))
	}

	const removeCourse = (id: CourseId) => {
		return dispatch(deleteCourse(id))
	}

	const addCourse = (course: Course) => {
		return dispatch(createCourse(course))
	}

	return { getCourses, getCourseById, addCourse, removeCourse }
}
