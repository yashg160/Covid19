import React from "react";
import "./css/Footer.css";

export default class Footer extends React.Component {
	render() {
		return (
			<footer>
				<h3>Covid-19 Tracker</h3>
				<p>Created by Yash Gupta</p>
				<div className="social">
					<a
						href="https://www.linkedin.com/in/yash-gupta-575679179/"
						target="_blank">
						LinkedIn
					</a>
					<a href="https://www.github.com/yashg160" target="_blank">
						Github
					</a>
				</div>
				<div className="warnings">
					<p>
						I take no responsibility for the authenticity of the
						data provided
					</p>
					<p>Use at your own risk</p>
				</div>

				<p>
					Data provided by{" "}
					<a href="https://www.covid19api.com" target="_blank">
						api.covid19api.com
					</a>{" "}
					and{" "}
					<a href="https://api.covid19india.org" target="_blank">
						api.covid19india.org
					</a>
				</p>
			</footer>
		);
	}
}
