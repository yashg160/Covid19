import React from "react";
import "./css/App.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="main">
        <div id="navbar">
          <h3>COVID-19</h3>
        </div>
        <div className="container">
          <div className="global">
            <div className="global-card">
              <p>Total Global Cases</p>
              <h5>Some figure</h5>
            </div>

            <div className="global-card">
              <p>Total Global Deaths</p>
              <h5>Some figure</h5>
            </div>

            <div className="global-card">
              <p>Total Global Cured</p>
              <h5>Some figure</h5>
            </div>
          </div>

          <div className="content">
            <div className="numbers">
              <div className="numbers-card">
                <p>Total India Cases</p>
                <h5>Some figure</h5>
              </div>

              <div className="numbers-card">
                <p>Total India Cases</p>
                <h5>Some figure</h5>
              </div>

              <div className="numbers-card">
                <p>Total India Cases</p>
                <h5>Some figure</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
