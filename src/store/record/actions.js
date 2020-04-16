import { apiUrl } from '../../config/constants'
import { imageUrl } from '../../config/constants'
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export const addRecord = record => {
  return async (dispatch, getState) => {
    dispatch(appLoading())
    console.log(record)
    dispatch(appDoneLoading())
  }
}
