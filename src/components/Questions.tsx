import QuestionsList from '@/components/QuestionsList'

export default function Questions() {
	return (
		<section className="w-full">
			<h3 className="text-center text-2xl font-bold mb-10">Preguntas</h3>
			<div className="grid grid-cols-2 text-center font-bold text-xl border-b-2 border-b-gray-400 pb-2">
				<p>Pregunta - Respuesta</p>
				<p>Opción múltiple</p>
			</div>

			<div className="grid grid-cols-2 text-center font-bold text-xl border-b-2 border-b-gray-400 py-2 h-100 overflow-y-scroll">
				<QuestionsList />
				<QuestionsList />
			</div>
		</section>
	)
}
