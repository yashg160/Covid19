import * as ActionTypes from "./ActionTypes";

export default function India(
	state = {
		errMess: "ERR_NONE",
		loading: true,
		data: null,
	},
	action
) {
	switch (action.type) {
		case ActionTypes.LOADING_INDIA:
			return { ...state, data: null };
		case ActionTypes.ADD_INDIA:
			return { ...state, loading: false, data: action.payload };
		case ActionTypes.ERROR_INDIA:
			return {
				...state,
				loading: false,
				data: action.payload,
				errMess: "ERR_TRUE",
			};
		default:
			return state;
	}
}
