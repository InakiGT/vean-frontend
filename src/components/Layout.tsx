import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
			<Header />

			{ children }

			<Footer />
		</div>
	)
}
