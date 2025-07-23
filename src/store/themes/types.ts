import { MultipleQuestion } from '@/store/questions/types'

export type ThemeId = string

export interface Theme extends MultipleQuestion {
	name: string,
	course: string,
}

export interface ThemeWithId extends Theme {
	_id: ThemeId,
}
