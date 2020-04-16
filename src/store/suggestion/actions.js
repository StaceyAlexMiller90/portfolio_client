import { apiUrl } from '../../config/constants'
import { imageUrl } from '../../config/constants'
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export const getSuggestions = (imageUrl) => {
  return async (dispatch, getState) => {
    dispatch(appLoading())
    try {
      const response = axios.post(`${apiUrl}/suggestion`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
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