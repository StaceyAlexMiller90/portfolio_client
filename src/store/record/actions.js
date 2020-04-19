import { apiUrl } from '../../config/constants'
import { imageUrl } from '../../config/constants'
import { selectToken } from "../user/selectors";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export const addARecord = record => {
  return async (dispatch, getState) => {
    const token = selectToken(getState())
    dispatch(appLoading())
    try {
      const response = await axios.post(`${apiUrl}/records`,
       record ,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      dispatch(showMessageWithTimeout('dark', true, response.data.message))
    } catch(e) {
      console.log(e.message)
    }
    dispatch(appDoneLoading())
  }
}
