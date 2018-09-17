import { combineReducers } from "redux";
import bags from "./bags";
import auth from './auth'

export default combineReducers({
  bags,
  auth
});
