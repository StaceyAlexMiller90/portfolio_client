import { apiUrl } from '../../config/constants'
import { selectToken } from '../user/selectors'
import axios from 'axios'
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from '../appState/actions'

export const clearSuggestionInfo = () => {
  return { type: 'SUGGESTIONS_CLEARED' }
}

const sendSuggestions = (data) => {
  return {
    type: 'SUGGESTIONS_FETCHED',
    payload: data,
  }
}

export const getSuggestions = (imageUrl, title, artist) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())
    dispatch(appLoading())
    try {
      const response = await axios.post(
        `${apiUrl}/suggestion`,
        { imageUrl, title, artist },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch(sendSuggestions({ data: response.data, image: imageUrl }))
      dispatch(showMessageWithTimeout('success', response.data.message))
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.message)
        dispatch(showMessageWithTimeout('error', e.response.data.message))
      } else {
        console.log(e.message)
        dispatch(setMessage('error', e.message))
      }
    }
    dispatch(appDoneLoading())
  }
}
