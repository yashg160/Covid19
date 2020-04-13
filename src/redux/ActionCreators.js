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

			// All the data that is sent through the India reducer;
			let data = {
				indiaData: [],
				indiaChartData: {
					labels: [],
					datasets: [],
				},
			};

			// Create the empty objects for total, deaths and recovered. These will be pushed to the datasets array in chart data
			let totalConfirmed = {
				label: "Total Confirmed",
				data: [],
				borderColor: "rgba(255, 0, 0, 0.6)",
				pointBackgroundColor: "rgba(255, 0,0,0.8)",
				hoverBorderColor: "rgba(255,0,0,0.9)",
				pointHoverRadius: 6,
			};

			let totalDeaths = {
				label: "Total Deaths",
				data: [],
				borderColor: "rgba(200,200,200,0.6)",
				pointBackgroundColor: "rgba(200, 200, 200, 1)",
				hoverBorderColor: "rgba(230,230,230,1)",
				pointHoverRadius: 6,
			};

			let totalRecovered = {
				label: "Total Recovered",
				data: [],
				borderColor: "rgba(0,255,0, 0.6)",
				pointBackgroundColor: "rgba(0, 255, 0, 0.8)",
				hoverBorderColor: "rgba(0,255,0,0.9)",
				pointHoverRadius: 6,
			};

			// Here all the statewise data is retrieved and processed.
			var stateData = jsonData.statewise;
			for (let i = 1; i < 38; i++) {
				var state = stateData[i];
				data.indiaData.push({
					active: state.active,
					confirmed: state.confirmed,
					deaths: state.deaths,
					recovered: state.recovered,
					stateName: state.state,
				});
			}

			// Here all the chart data is processed.
			var chartData = jsonData.cases_time_series;
			// Start from index 40 to remove previous values that are all same. This prevents the chart from becoming congested.
			for (let i = 40; i < chartData.length; i++) {
				var chartPoint = chartData[i];

				// Use the dates of the data points as labels for the x axis
				data.indiaChartData.labels.push(chartPoint.date);

				totalConfirmed.data.push(chartPoint.totalconfirmed);
				totalDeaths.data.push(chartPoint.totaldeceased);
				totalRecovered.data.push(chartPoint.totalrecovered);
			}

			data.indiaChartData.datasets.push(totalConfirmed);
			data.indiaChartData.datasets.push(totalDeaths);
			data.indiaChartData.datasets.push(totalRecovered);

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
