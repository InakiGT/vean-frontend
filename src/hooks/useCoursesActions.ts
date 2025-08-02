import { useAppDispatch } from '@/hooks/store'
import { Course, CourseId, CourseWithId } from '@/store/courses/types'
import { createCourse, deleteCourse, fetchCourses, fetchCourseWithThemes, updateCourse } from '@/thunks/course.thunk'

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

	const changeCourse = (course: CourseWithId) => {
		return dispatch(updateCourse(course))
	}

	return { getCourses, getCourseById, addCourse, removeCourse, changeCourse }
}
