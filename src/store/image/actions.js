import { apiUrl } from '../../config/constants'
import { imageUrl } from '../../config/constants'
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export const addRecord = file => {
  return async (dispatch, getState) => {
    dispatch(appLoading())
    console.log('action file', file)
    dispatch(appDoneLoading())
  }
}
