import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class HelpArticle extends Component {

  render() {

    return (
        <>
        <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h2 className="m-0 font-weight-bold text-primary">How to View Daily Schedule ?</h2>
          </div>
        </div>
        <div>
            <p className="py-3" ><a href="/help">Go back to the Help Center </a></p>
        </div>
        
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header py-3">
                        <h5 className="title">
                            The below article describes how to view the Daily SAP Scheduled Items.
                        </h5>
                    </div>
                    <div className="card-body"> 
                        <p className="card-text">
                            Login to the BlueSky Application as show below.
                        </p>
                        <img src="./helpart2.png" />
                        <hr></hr>
                        <p className="card-text">
                            Go to Daily Schedule Items on the left menu
                        </p>
                        <img src="./helpart1.png" />
                        <hr></hr>
                        <p className="card-text">
                            See the list of the schedule items.
                        </p>
                        <img src="./helpart3.png" />
                    </div>
                </div>
            </div>
        </div>
        </div>
      </>
    );
  }
}
