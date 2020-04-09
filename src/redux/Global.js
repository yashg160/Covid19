import * as ActionTypes from "./ActionTypes";

export default function Global(
	state = {
		errMess: null,
		data: null,
	},
	action
) {
	switch (action.type) {
		case ActionTypes.LOADING_GLOBAL:
			return {
				...state,
				loading: true,
				errMess: "ERR_NONE",
				data: action.payload,
			};
		case ActionTypes.ADD_GLOBAL:
			return {
				...state,
				loading: false,
				errMess: "ERR_NONE",
				data: action.payload,
			};
		case ActionTypes.ERROR_GLOBAL:
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
