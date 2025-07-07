
export default function Header() {
	return (
		<header className="bg-cua-orange text-white text-center flex justify-between items-center py-5 px-20">
			<img src="LogoUAM.webp" alt="Imagen principal, Logo UAM" className="w-25" />

			<div>
				<h1 className="text-3xl font-bold">Sistema de Videojuegos de Apoyo a la Enseñanza para Profesores (VAEP)</h1>
				<p className="text-black">Usuario:</p>
			</div>

			<button className="bg-blue-950 px-5 rounded-sm uppercase py-2 flex flex-row items-center justify-between gap-3 cursor-pointer">Cerrar sesión</button>
		</header>
	)
}
