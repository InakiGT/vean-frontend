
export default function TitleSkeleton() {
	return (
		<div role="status" className="animate-pulse">
			<div className="h-4 bg-gray-100 rounded-full dark:bg-gray-300 w-70"></div>
			<span className="sr-only">Loading...</span>
		</div>
	)
}
