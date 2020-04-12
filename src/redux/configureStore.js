import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Global from "./Global";
import Country from "./Country";
import India from "./India";

const rootReducer = combineReducers({
	global: Global,
	country: Country,
	india: India,
});
export const ConfigureStore = () => {
	console.log("Store config");
	return createStore(rootReducer, applyMiddleware(...[thunk, logger]));
};
