import { useCoursesActions } from '@/hooks/useCoursesActions'
import type { CourseWithId } from '@/store/courses/types'
import { useNavigate } from 'react-router-dom'

export default function CourseListItem({ course }: { course: CourseWithId }) {
	const { removeCourse } = useCoursesActions()
	const navigator = useNavigate()

	return (
		<li className="flex items-center gap-3">
			<p className="bg-gray-200 p-2 rounded-t-sm text-gray-500 w-50 text-nowrap overflow-x-scroll">{ course.name }</p>
			<button onClick={ () => navigator(`/course/${ course._id }`) } className="bg-blue-700 text-white uppercase p-2 rounded-sm hover:bg-blue-800 hover:drop-shadow-md cursor-pointer transition-all">Seleccionar</button>
			<button onClick={ () => removeCourse(course._id) } className="bg-orange-400 text-white uppercase p-2 rounded-sm hover:bg-orange-500 hover:drop-shadow-md cursor-pointer transition-all">Borrar</button>
		</li>
	)
}
