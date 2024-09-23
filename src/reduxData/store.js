import { combineReducers, createStore } from "redux";
import formDataReducer from "./formReducers";

const rootReducer = combineReducers({
    form: formDataReducer
})
const store = createStore(rootReducer)

export default store;