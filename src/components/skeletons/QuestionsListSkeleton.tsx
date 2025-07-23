
export default function QuestionsListSkeleton() {
	return (
		<div role="status" className="w-full flex flex-col items-center gap-5 animate-pulse">
			{
				Array(10).fill(0).map((_, i) => (
				<div key={ i } className="flex gap-3">
					<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-5"></div>
					<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-35"></div>
					<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-5"></div>
					<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-5"></div>
				</div>
				))
			}
			<span className="sr-only">Loading...</span>
		</div>
	)
}
