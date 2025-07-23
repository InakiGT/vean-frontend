
export default function GetItemsError({ error }: { error: string }) {
	return (
		<p className='bg-red-400 w-full text-center text-white font-bold text-2xl rounded-sm drop-shadow-sm'>{ error }</p>
	)
}
