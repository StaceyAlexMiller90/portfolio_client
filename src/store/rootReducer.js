import { combineReducers } from 'redux'
import appState from './appState/reducer'
import user from './user/reducer'
import suggestion from './suggestion/reducer'
import record from './record/reducer'

export default combineReducers({
  appState,
  user,
  suggestion,
  record,
})
