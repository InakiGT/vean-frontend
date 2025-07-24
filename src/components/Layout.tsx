import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import GamesContainer from '@/components/GamesContainer'

export default function Layout({ children }: { children: ReactNode }) {
	const location = useLocation()

	return (
		<div className="grid min-h-dvh grid-rows-[auto_1fr_auto] relative">
			<Header />
			{
				location.pathname !== '/games' && location.pathname !== '/login' && location.pathname !== '/register' &&
				<GamesContainer />
			}
			{ children }

			<Footer />
		</div>
	)
}
