import { createAsyncThunk } from '@reduxjs/toolkit'
import config from '@/config'
import { Course } from '@/store/courses/types'
import { getCookie } from '@/helpers/cookies'

const URI = `${ config.serverUri }/course`

export const fetchCourses = createAsyncThunk('/course', async () => {
	const response = await fetch(URI)

	return (await response.json()).data
})

export const fetchCourseWithThemes = createAsyncThunk('/course/themes', async (id: string) => {
	const response = await fetch(`${ URI }/${ id }`)

	return (await response.json()).data
})

export const createCourse = createAsyncThunk('/course/create', async (course: Course) => {
	const cookie = await getCookie('jwt')

	const response = await fetch(URI, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ cookie?.value }`
		},
		body: JSON.stringify({ ...course }),
	})

	return (await response.json()).data
})

export const deleteCourse = createAsyncThunk('/course/delete', async (id: string) => {
	const cookie = await getCookie('jwt')

	const response = await fetch(`${ URI }/${ id }`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${ cookie?.value }`
		},
	})

	return {
		id,
		status: response.status,
	}
})
