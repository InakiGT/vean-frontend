import CourseListItem from '@/components/CourseListItem'

export default function CoursesList() {
	return (
		<ul className="border-b-2 w-full border-b-gray-500 pb-5 flex flex-col items-center gap-3 h-60 overflow-y-scroll">
			<CourseListItem />
			<CourseListItem />
			<CourseListItem />
			<CourseListItem />
		</ul>
	)
}
