import {combineReducers, createStore} from "redux";
import profile from "./reducers/profile";
import  {composeWithDevTools} from  "redux-devtools-extension";

const rootReducer = combineReducers({
    profile
})

const store = createStore(rootReducer,composeWithDevTools());
export default store;