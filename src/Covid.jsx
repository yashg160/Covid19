import React from "react";
import AutocompleteText from "./AutocompleteText";
import "./css/App.css";

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

	newCountry(e, country) {
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
						<div className="card card-1">
							{this.props.globalLoading ? (
								<p>Loading...</p>
							) : (
								<div>
									<p className="card-title">World Total</p>
									<h5 className="card-content">
										{
											this.props.global.Global
												.TotalConfirmed
										}
									</h5>
								</div>
							)}
						</div>

						<div className="card card-2">
							{this.props.globalLoading ? (
								<p>Loading...</p>
							) : (
								<div>
									<p className="card-title">World Deaths</p>
									<h5 className="card-content red">
										{this.props.global.Global.TotalDeaths}
									</h5>
								</div>
							)}
						</div>

						<div className="card card-3">
							{this.props.globalLoading ? (
								<p>Loading...</p>
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
						newCountry={(e, country) => this.newCountry(e, country)}
					/>
					<div className="card-container">
						<div className="card card-1">
							{this.props.countryLoading ? (
								<p>Loading...</p>
							) : (
								<div>
									<p className="card-title">
										{this.props.country[0].Country} Total
									</p>
									<h5 className="card-content">
										{
											this.props.country.slice(-1)[0]
												.Confirmed
										}
									</h5>
								</div>
							)}
						</div>

						<div className="card card-2">
							{this.props.countryLoading ? (
								<p>Loading...</p>
							) : (
								<div>
									<p className="card-title">
										{this.props.country[0].Country} Deaths
									</p>
									<h5 className="card-content red">
										{this.props.country.slice(-1)[0].Deaths}
									</h5>
								</div>
							)}
						</div>

						<div className="card card-3">
							{this.props.countryLoading ? (
								<p>Loading...</p>
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

						<div className="card card-4">
							{this.props.countryLoading ? (
								<p>Loading...</p>
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
					<div className="india-cards-container">
						{this.props.indiaLoading ? (
							<p>Loading...</p>
						) : (
							this.props.india.map((state) => (
								<div className="india-card">
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
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	global: state.global.data,
	globalLoading: state.global.loading,
	country: state.country.data,
	countryLoading: state.country.loading,
	india: state.india.data,
	indiaLoading: state.india.loading,
});

export default connect(mapStateToProps, {
	fetchGlobalData,
	fetchCountryData,
	fetchIndiaData,
})(Covid);
