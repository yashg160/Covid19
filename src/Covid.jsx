import React from "react";
import AutocompleteText from "./AutocompleteText";
import "./css/App.css";

import { fetchGlobalData, fetchCountryData } from "./redux/ActionCreators";
import { connect } from "react-redux";

class Covid extends React.Component {
	componentDidMount() {
		this.props.fetchGlobalData();
		this.props.fetchCountryData("india");
	}

	newCountry(e, country) {
		console.log(country);
	}

	render() {
		console.log(this.props);
		return (
			<div className="main">
				<div id="navbar">
					<h3>COVID-19</h3>
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
									<p className="card-title">World Total</p>
									<h5 className="card-content">
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
									<p className="card-title">World Total</p>
									<h5 className="card-content">
										{
											this.props.global.Global
												.TotalRecovered
										}
									</h5>
								</div>
							)}
						</div>
					</div>
					<h2 className="instruction">Enter a country name</h2>
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
										Total {this.props.country[0].Country}{" "}
										Cases
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
										Total {this.props.country[0].Country}{" "}
										Cases
									</p>
									<h5 className="card-content">
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
										Total {this.props.country[0].Country}{" "}
										Cases
									</p>
									<h5 className="card-content">
										{
											this.props.country.slice(-1)[0]
												.Recovered
										}
									</h5>
								</div>
							)}
						</div>
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
});

export default connect(mapStateToProps, { fetchGlobalData, fetchCountryData })(
	Covid
);
