export type QuestionId = string

export interface Question {
	question: string,
	theme: string,
	answer?: string,
	answers?: string[],
	correctAnswer?: string,
}

export interface QuestionWithId extends Question {
	_id: QuestionId,
}

export interface MultipleQuestion {
	openQuestions?: QuestionWithId[] | undefined,
	mcQuestions?: QuestionWithId[] | undefined,
}
