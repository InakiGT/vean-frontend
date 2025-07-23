
export default function GameListSkeleton() {
	return (
		<div role="status" className="border-b-2 w-full border-b-gray-500 flex flex-col items-center gap-3 h-60 overflow-y-scroll animate-pulse">
			{
				Array(3).fill(0).map((_, i) => (
				<div key={ i } className="flex gap-3 items-center">
					<div className="h-50 bg-gray-100 rounded-sm dark:bg-gray-300 w-30 xl:w-40 2xl:w-70"></div>
					<div className="flex flex-col gap-2">
						<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-30"></div>
						<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-40"></div>
						<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-30"></div>
						<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-40"></div>
						<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-30"></div>
						<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-40"></div>
					</div>
					<div className="flex flex-col gap-5">
						<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-20"></div>
						<div className="h-5 bg-gray-100 rounded-full dark:bg-gray-300 w-20"></div>
					</div>
				</div>
				))
			}
			<span className="sr-only">Loading...</span>
		</div>
	)
}
