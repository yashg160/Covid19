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
				lineGraphData: {
					labels: [],
					datasets: [],
				},
				barGraphData: {
					labels: [],
					datasets: []
				}
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
				data.lineGraphData.labels.push(chartPoint.date);

				totalConfirmed.data.push(chartPoint.totalconfirmed);
				totalDeaths.data.push(chartPoint.totaldeceased);
				totalRecovered.data.push(chartPoint.totalrecovered);
			}

			data.lineGraphData.datasets.push(totalConfirmed);
			data.lineGraphData.datasets.push(totalDeaths);
			data.lineGraphData.datasets.push(totalRecovered);

			// Now we start processing the data for the tested samples and the bar graph data
			let perDayTested = {
				label: "Daily Tested",
				data: [],
				backgroundColor: "rgba(66,155,245, 0.8)",
				hoverBackgroundColor: "rgba(21, 110, 200, 0.8)",
				barPercentage: 0.75
			};

			let perDayPositiveCases = {
				label: "Daily Positive Cases",
				data: [],
				backgroundColor: "rgba(255,0,0, 0.8)",
				hoverBackgroundColor: "rgba(200, 0, 0, 0.8)",
				barPercentage: 0.75
			};

			// The tested data from API that has been processed to json format
			var tempBarData = jsonData.tested;

			for(let i = 14; i < tempBarData.length; i++){
				var dataPoint = tempBarData[i];
				var prevPoint = tempBarData[i-1];

				perDayPositiveCases.data.push(Math.abs(dataPoint.totalpositivecases - prevPoint.totalpositivecases));
				perDayTested.data.push(Math.abs(dataPoint.totalsamplestested - prevPoint.totalsamplestested));

				var timestamp = dataPoint.updatetimestamp.split(" ")[0];
				data.barGraphData.labels.push(timestamp);
			}

			data.barGraphData.datasets.push(perDayPositiveCases);
			data.barGraphData.datasets.push(perDayTested);

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
