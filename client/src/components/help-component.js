import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Accordion, Card } from "react-bootstrap"; 


import "bootstrap/dist/css/bootstrap.min.css";

export default class Help extends Component {

  render() {

    return (
      <>
      <div className="container-fluid">
          <div className="row align-items-center">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h2 className="m-0 font-weight-bold text-primary">Help Center</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center py-3">
            <div className="col-lg-8 py-3" >
            <div className="card">
              <div className="card-body">
                <h5 className="title">
                  <a  style={{ color: "#e83e8c"}} href="/helparticle">How to view Daily Schedule?</a>
                </h5>
                <p className="card-text">This article describes how to view the daily schedule items. </p>
              </div>
            </div>
            </div>
            
            <div className="col-lg-8 py-3">
            <div className="card">
              <div className="card-body">
                <h5 className="title">
                  <a style={{ color: "#e83e8c"}} href="/helparticle">How to create PFI QC Card?</a>
                </h5>
                <p className="card-text">Learn how to create the PFI QC Card using the application </p>
              </div>
            </div>
            </div>
            <div className="col-lg-8 py-3">
            <div className="card">
              <div className="card-body">
                <h5 className="title">
                  <a style={{ color: "#e83e8c"}} href="/helparticle">How to create a General QC Card?</a>
                </h5>
                <p className="card-text">Learn how to create General QC Card using the application </p>
              </div>
            </div>
            </div>
            <div className="col-lg-8 py-3">
            <div className="card">
              <div className="card-body">
                <h5 className="title">
                  <a style={{ color: "#e83e8c"}} href="/helparticle">How to login?</a>
                </h5>
                <p className="card-text">How to login to the application? </p>
              </div>
            </div>
            </div>
            <div className="col-lg-8 py-3">
            <div className="card">
              <div className="card-body">
                <h5 className="title">
                  <a style={{ color: "#e83e8c"}} href="/helparticle">I forgot my password.</a>
                </h5>
                <p className="card-text">How to reset your password for the application?</p>
              </div>
            </div>
            </div>
            <div className="col-lg-8 py-3">
            <div className="card">
              <div className="card-body">
                <h5 className="title">
                  <a style={{ color: "#e83e8c"}} href="/helparticle">I need a new account.</a>
                </h5>
                <p className="card-text">Follow this process to setup a new account. </p>
              </div>
            </div>
            </div>
          </div>
      </div>
      </>
    );
  }
}
