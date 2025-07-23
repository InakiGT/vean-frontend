
export default function ListItemsSkeleton() {
	return (
		<div role="status" className="border-b-2 w-full border-b-gray-500 pb-5 flex flex-col items-center gap-3 h-60 overflow-y-scroll animate-pulse">
			{
				Array(8).fill(0).map((_, i) => (
				<div key={ i } className="flex gap-3">
					<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-50"></div>
					<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-30"></div>
					<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-20"></div>
				</div>
				))
			}
			<span className="sr-only">Loading...</span>
		</div>
	)
}
