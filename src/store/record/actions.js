import { apiUrl } from '../../config/constants'
import { imageUrl } from '../../config/constants'
import { selectToken } from '../user/selectors'
import axios from 'axios'
import {
	appLoading,
	appDoneLoading,
	showMessageWithTimeout,
	setMessage,
} from '../appState/actions'
import { clearSuggestionInfo } from '../suggestion/actions'
import { selectSuggestions } from '../suggestion/selectors'

const userRecordsFetched = (data) => {
	return {
		type: 'FETCHED_USER_RECORDS_SUCCESS',
		payload: data,
	}
}

export const fetchUserRecords = () => {
	return async (dispatch, getState) => {
		const token = selectToken(getState())
		dispatch(appLoading())
		try {
			const response = await axios.get(`${apiUrl}/records`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch(userRecordsFetched(response.data))
			dispatch(appDoneLoading())
		} catch (e) {
			console.log(e.message)
		}
	}
}

const addedRecord = (record) => {
	return {
		type: 'RECORD_ADDED_SUCCESS',
		payload: record,
	}
}

export const addARecord = (record) => {
	return async (dispatch, getState) => {
		const token = selectToken(getState())
		console.log(record)
		dispatch(appLoading())
		try {
			const response = await axios.post(`${apiUrl}/records`, record, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch(addedRecord(response.data.newRecord))
			dispatch(showMessageWithTimeout('success', response.data.message))
		} catch (e) {
			console.log(e.message)
			dispatch(showMessageWithTimeout('error', e.response.data.message))
		}
		dispatch(appDoneLoading())
	}
}

export const removeUserRecord = (recordId) => {
	return async (dispatch, getState) => {
		const token = selectToken(getState())
		dispatch(appLoading())
		try {
			const response = await axios.delete(`${apiUrl}/records`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: { recordId },
			})
			dispatch(fetchUserRecords())
			dispatch(showMessageWithTimeout('success', response.data.message))
			dispatch(appDoneLoading())
		} catch (e) {
			console.log(e.message)
		}
	}
}
