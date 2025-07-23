import { ThemeWithId } from '@/store/themes/types'

export type CourseId = string

export interface Course {
	name: string,
	themes?: ThemeWithId[]
}

export interface CourseWithId extends Course {
	_id: CourseId,
}
