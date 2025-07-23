import { useEffect, useState } from 'react'
import CourseListItem from '@/components/CourseListItem'
import { useAppSelector } from '@/hooks/store'
import { useCoursesActions } from '@/hooks/useCoursesActions'
import type { CourseWithId } from '@/store/courses/types'
import GetItemsError from '@/components/errors/GetItemsError'
import ListItemsSkeleton from '@/components/skeletons/ListItemsSkeleton'

export default function CoursesList() {
	const [ courses, setCourses ] = useState<CourseWithId[] | []>([])

	const { data, loading, error } = useAppSelector(state => state.courses)
	const { getCourses } = useCoursesActions()

	useEffect(() => {
		getCourses()
	}, [])

	useEffect(() => {
		setCourses(data)
	}, [ data ])

	if ( loading ) return <ListItemsSkeleton />
	if ( error ) return <GetItemsError error={ error } />

	return (
		<ul className="border-b-2 w-full border-b-gray-500 pb-5 flex flex-col items-center gap-3 h-60 overflow-y-scroll">
			{
				courses.map(course => <CourseListItem key={ course._id } course={ course } />)
			}
		</ul>
	)
}
