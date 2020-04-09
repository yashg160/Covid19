import * as ActionTypes from "./ActionTypes";

export default function Country(
	state = {
		errMess: null,
		data: null,
	},
	action
) {
	switch (action.type) {
		case ActionTypes.LOADING_COUNTRY:
			return { ...state, loading: true, errMess: "ERR_NONE", data: {} };
		case ActionTypes.ADD_COUNTRY:
			return {
				...state,
				loading: false,
				errMess: "ERR_NONE",
				data: action.payload,
			};
		case ActionTypes.ERROR_COUNTRY:
			return {
				...state,
				loading: false,
				errMess: "ERR_TRUE",
				data: action.payload,
			};
		default:
			return state;
	}
}
