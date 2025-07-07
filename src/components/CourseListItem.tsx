
export default function CourseListItem() {
	return (
		<li className="flex items-center gap-3">
			<p className="bg-gray-200 p-2 rounded-t-sm text-gray-500">Administración de proyectos</p>
			<button className="bg-blue-700 text-white uppercase p-2 rounded-sm hover:bg-blue-800 hover:drop-shadow-md cursor-pointer transition-all">Seleccionar</button>
			<button className="bg-orange-400 text-white uppercase p-2 rounded-sm hover:bg-orange-500 hover:drop-shadow-md cursor-pointer transition-all">Borrar</button>
		</li>
	)
}
