import React, { Component } from "react";

export default class Default extends Component {
  render() {
    console.log(this.props.location.pathname);
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto text-center text-title text-uppercase">
              <h1>404 error</h1>
              <h1>page not be found</h1>
              <h3>
                the request URL:<span className="text-danger">{this.props.location.pathname}</span>not found
              </h3>
            </div>
          </div>
        </div>
      </>
    );
  }
}
