import ThemeListItem from '@/components/ThemeListItem'
import { ThemeWithId } from '@/store/themes/types'
import ListItemsSkeleton from '@/components/skeletons/ListItemsSkeleton'
import GetItemsError from '@/components/errors/GetItemsError'

export default function ThemesList({ loading, error, themes }:
	{
		themes: ThemeWithId[] | undefined,
		loading: boolean,
		error: string | null
	}) {

	if ( loading ) return <ListItemsSkeleton />
	if ( error ) return <GetItemsError error={ error } />

	return (
		<ul className="border-b-2 w-full border-b-gray-500 pb-5 flex flex-col items-center gap-2 h-60 overflow-y-scroll">
			{
				themes?.map(theme => <ThemeListItem key={ theme._id } theme={ theme } />)
			}
		</ul>
	)
}
