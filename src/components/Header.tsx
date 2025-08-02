import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { deleteCookie, getCookie } from '@/helpers/cookies'

export default function Header() {
	const navigate = useNavigate()
	const location = useLocation()

	const logout = async () => {
		await deleteCookie('jwt')
		navigate('/login')
	}

	useEffect(() => {
		const validateCookie = async () => {
			const cookie = await getCookie('jwt')

			if (!cookie?.value && location.pathname !== '/login' && location.pathname !== '/register') {
				navigate('/login')
			}
		}

		validateCookie()
	}, [])

	return (
		<header className="bg-cua-orange text-white text-center flex justify-between items-center py-5 px-20">
			<img src="/vaep/LogoUAM.webp" alt="Imagen principal, Logo UAM" className="w-25" />

			<h1 className="text-3xl font-bold">Sistema de Videojuegos de Apoyo a la Enseñanza para Profesores (VAEP)</h1>

			{
				location.pathname !== '/login' && location.pathname !== '/register' &&
				<button onClick={ logout } className="bg-blue-950 px-5 rounded-sm uppercase py-2 flex flex-row items-center justify-between gap-3 cursor-pointer">Cerrar sesión</button>
			}
		</header>
	)
}
