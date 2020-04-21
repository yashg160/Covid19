import React from "react";
import AutocompleteText from "./AutocompleteText";
import Footer from "./Footer";
import "./css/App.css";
import { Line, Bar } from "react-chartjs-2";

import {
	fetchGlobalData,
	fetchCountryData,
	fetchIndiaData,
} from "./redux/ActionCreators";
import { connect } from "react-redux";

class Covid extends React.Component {
	componentDidMount() {
		this.props.fetchGlobalData();
		this.props.fetchCountryData("india");
		this.props.fetchIndiaData();
	}

	newCountry(country) {
		console.log(country);
		this.props.fetchCountryData(country);
	}

	render() {
		console.log(this.props);
		return (
			<div className="main">
				<div id="navbar">
					<h3>COVID-19 TRACKER</h3>
				</div>
				<div className="container">
					<div className="card-container">
						<div className="card red-card">
							{this.props.globalError === "ERR_TRUE" ? (
								<p>error</p>
							) : this.props.globalLoading ? (
								<div className="loading" />
							) : (
								<div>
									<p className="card-title">World Total</p>
									<h5 className="card-content red">
										{
											this.props.global.Global
												.TotalConfirmed
										}
									</h5>
								</div>
							)}
						</div>

						<div className="card  neutral-card">
							{this.props.globalError === "ERR_TRUE" ? (
								<p>error</p>
							) : this.props.globalLoading ? (
								<div className="loading" />
							) : (
								<div>
									<p className="card-title">World Deaths</p>
									<h5 className="card-content neutral">
										{this.props.global.Global.TotalDeaths}
									</h5>
								</div>
							)}
						</div>

						<div className="card green-card">
							{this.props.globalError === "ERR_TRUE" ? (
								<p>error</p>
							) : this.props.globalLoading ? (
								<div className="loading" />
							) : (
								<div>
									<p className="card-title">
										World Recovered
									</p>
									<h5 className="card-content green">
										{
											this.props.global.Global
												.TotalRecovered
										}
									</h5>
								</div>
							)}
						</div>
					</div>
					<h2 className="instruction">Country Name</h2>
					<AutocompleteText
						newCountry={(e, country) => this.newCountry(country)}
					/>
					<div className="card-container">
						<div className="card red-card">
							{this.props.countryError === "ERR_TRUE" ? (
								<p>error</p>
							) : this.props.countryLoading ? (
								<div className="loading" />
							) : (
								<div>
									<p className="card-title">
										{this.props.country[0].Country} Total
									</p>
									<h5 className="card-content red">
										{
											this.props.country.slice(-1)[0]
												.Confirmed
										}
									</h5>
								</div>
							)}
						</div>

						<div className="card neutral-card">
							{this.props.countryError === "ERR_TRUE" ? (
								<p>error</p>
							) : this.props.countryLoading ? (
								<div className="loading" />
							) : (
								<div>
									<p className="card-title">
										{this.props.country[0].Country} Deaths
									</p>
									<h5 className="card-content neutral">
										{this.props.country.slice(-1)[0].Deaths}
									</h5>
								</div>
							)}
						</div>

						<div className="card green-card">
							{this.props.countryError === "ERR_TRUE" ? (
								<p>error</p>
							) : this.props.countryLoading ? (
								<div className="loading" />
							) : (
								<div>
									<p className="card-title">
										{this.props.country[0].Country}{" "}
										Recovered
									</p>
									<h5 className="card-content green">
										{
											this.props.country.slice(-1)[0]
												.Recovered
										}
									</h5>
								</div>
							)}
						</div>

						<div className="card yellow-card">
							{this.props.countryError === "ERR_TRUE" ? (
								<p>error</p>
							) : this.props.countryLoading ? (
								<div className="loading" />
							) : (
								<div>
									<p className="card-title">
										{this.props.country[0].Country} Active
									</p>
									<h5 className="card-content yellow">
										{this.props.country.slice(-1)[0].Active}
									</h5>
								</div>
							)}
						</div>
					</div>
					<h2 className="instruction">India Details</h2>
					<div className="india-cards-container">
						{this.props.indiaError === "ERR_TRUE" ? (
							<p>error</p>
						) : this.props.indiaLoading ? (
							<div className="loading" />
						) : (
							this.props.india.indiaData.map((state) => (
								<div
									className="india-card"
									key={state.stateName}>
									<p className="india-card-title">
										{state.stateName}
									</p>
									<div className="india-card-content-row">
										<p className="india-card-field">
											Confirmed
										</p>
										<p className="india-card-content">
											{state.confirmed}
										</p>
									</div>
									<div className="india-card-content-row">
										<p className="india-card-field">
											Active
										</p>
										<p className="india-card-content">
											{state.active}
										</p>
									</div>
									<div className="india-card-content-row">
										<p className="india-card-field">
											Deaths
										</p>
										<p className="india-card-content">
											{state.deaths}
										</p>
									</div>
									<div className="india-card-content-row">
										<p className="india-card-field">
											Recovered
										</p>
										<p className="india-card-content">
											{state.recovered}
										</p>
									</div>
								</div>
							))
						)}
					</div>
					<div className="chart">
						{this.props.indiaLoading ? (
							<p>Loading...</p>
						) : (
							<Line
								data={this.props.india.lineGraphData}
								options={{
									layout: {
										padding: {
											top: 32,
											bottom: 32,
										},
									},
									maintainAspectRatio: false,
									title: {
										display: true,
										text: "COVID 19 Cases in India",
										fontColor: "rgba(200, 200, 200, 1)",
									},
									legend: { display: true },
									scales: {
										gridLines: {
											color: "rgba(200, 200, 200, 1)",
										},
										yAxes: [
											{
												ticks: {
													beginAtZero: false,
													stepSize: 1000,
													fontColor:
														"rgba(200, 200, 200, 1)",
												},
											},
										],
										xAxes: [
											{
												ticks: {
													fontColor:
														"rgba(200, 200, 200, 1)",
												},
											},
										],
									},
								}}
							/>
						)}
					</div>
					<div className="chart">
					{this.props.indiaLoading ? <div className="loading"></div>: (
							<Bar
							data={this.props.india.barGraphData}
							options={{
								layout: {
									padding: {
										top: 32,
										bottom: 32,
									},
								},
								maintainAspectRatio: false,
								title: {
									display: true,
									text: "COVID 19 Cases in India",
									fontColor: "rgba(200, 200, 200, 1)",
								},
								legend: { display: true },
								scales: {
									gridLines: {
										color: "rgba(200, 200, 200, 1)",
									},
									yAxes: [
										{
											ticks: {
												beginAtZero: false,
												stepSize: 6000,
												fontColor:
													"rgba(200, 200, 200, 1)",
											},
										},
									],
									xAxes: [
										{
											ticks: {
												fontColor:
													"rgba(200, 200, 200, 1)",
											},
										},
									],
								},
							}}
						/>
						)}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	global: state.global.data,
	globalLoading: state.global.loading,
	globalError: state.global.errMess,
	country: state.country.data,
	countryLoading: state.country.loading,
	countryError: state.country.errMess,
	india: state.india.data,
	indiaLoading: state.india.loading,
	indiaError: state.india.errMess,
});

export default connect(mapStateToProps, {
	fetchGlobalData,
	fetchCountryData,
	fetchIndiaData,
})(Covid);
