import * as ActionTypes from "./ActionTypes";
const baseUrl = "https://api.covid19api.com";
const indiaUrl = "https://api.covid19india.org/data.json";

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

export const fetchIndiaData = () => (dispatch) => {
	dispatch(loadingIndiaData());

	fetch(indiaUrl)
		.then((response) => {
			console.log(response);
			return response;
		})
		.then((response) => {
			console.log(response);
			return response.body.getReader();
		})
		.then((reader) => reader.read())
		.then((utfObj) => {
			var utf = utfObj.value;
			var td = new TextDecoder("utf-8");
			var jsonData = JSON.parse(td.decode(utf));
			return jsonData;
		})
		.then((jsonData) => {
			console.log(jsonData);
			let data = [];
			var stateData = jsonData.statewise;
			for (let i = 1; i < 38; i++) {
				var state = stateData[i];
				data.push({
					active: state.active,
					confirmed: state.confirmed,
					deaths: state.deaths,
					recovered: state.recovered,
					stateName: state.state,
				});
			}
			return data;
		})
		.then((data) => dispatch(addIndiaData(data)))
		.catch((err) => dispatch(errorIndiaData(err)));
};

export const loadingIndiaData = () => ({
	type: ActionTypes.LOADING_INDIA,
	payload: null,
});

export const addIndiaData = (data) => ({
	type: ActionTypes.ADD_INDIA,
	payload: data,
});

export const errorIndiaData = (error) => ({
	type: ActionTypes.ERROR_INDIA,
	payload: error,
});
