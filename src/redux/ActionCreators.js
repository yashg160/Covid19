import * as ActionTypes from "./ActionTypes";
const baseUrl = "https://api.covid19api.com";

export const fetchGlobalData = () => (dispatch) => {
	dispatch(loadingGlobalData);

	return fetch(baseUrl + "/summary")
		.then((response) => {
			if (!response.ok) throw Error();
			else return response;
		})
		.then((response) => response.json())
		.then((data) => dispatch(addGlobalData(data)))
		.catch((error) => dispatch(errorGlobalData(error)));
};

export const loadingGlobalData = () => ({
	type: ActionTypes.LOADING_GLOBAL,
	payload: null,
});

export const addGlobalData = (data) => ({
	type: ActionTypes.ADD_GLOBAL,
	payload: data,
});

export const errorGlobalData = (error) => ({
	type: ActionTypes.ERROR_GLOBAL,
	payload: error,
});

export const fetchCountryData = (country) => (dispatch) => {
	dispatch(loadingCountryData(country));

	return fetch(baseUrl + `/live/country/${country}/status/confirmed`)
		.then((response) => {
			if (!response.ok) throw Error();
			else return response;
		})
		.then((response) => response.json())
		.then((data) => dispatch(addCountryData(country, data)))
		.catch((error) => dispatch(errorCountryData(country, error)));
};

export const loadingCountryData = (country) => ({
	type: ActionTypes.LOADING_COUNTRY,
	country,
	payload: null,
});

export const addCountryData = (country, data) => ({
	type: ActionTypes.ADD_COUNTRY,
	country,
	payload: data,
});
export const errorCountryData = (country, error) => ({
	type: ActionTypes.ERROR_COUNTRY,
	country,
	payload: error,
});
