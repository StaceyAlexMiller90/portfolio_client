import { apiUrl } from '../../config/constants'
import { selectToken } from "../user/selectors";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";


const sendSuggestions = (data) => {
  return {
    type: 'SUGGESTIONS_FETCHED',
    payload: data
  }
}

export const getSuggestions = (imageUrl) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())
    dispatch(appLoading())
    try {
      const response = await axios.post(`${apiUrl}/suggestion`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      dispatch(sendSuggestions(response.data))
      dispatch(showMessageWithTimeout('dark', true, response.data.message))
    } catch(e) {
      if(e.response) {
        console.log(e.response.data.message);
        dispatch(setMessage("danger", true, e.response.data.message))
      } else {
        console.log(e.message)
        dispatch(setMessage("danger", true, e.message));
      }
    }
    dispatch(appDoneLoading())
  }
}