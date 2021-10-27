import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div>
        <div className="jumbotron hero-image">
          {(this.state.userReady ? (
            <h1>user here</h1>
          ):(
            <h1>No user</h1>
          ))}
        {(this.state.userReady) ?
        <div>
        <header >
        <div className="hero-text">
            <h1>Toyota Quality Center</h1>
        </div>
        </header>
        </div>: null}
        </div>
        <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="title">
                  <a href="/pfiqc">PFI QC Card</a>
                </h5>
                <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s </p>
                <h6>
                  <a href="/help">Need Help? Click here</a>
                </h6>
              </div>
              
            </div>
            
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="title">
                  <a href="/generalqc">General QC Card</a>
                </h5>
                <p className="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <a href="/help">Need Help? Click here</a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      
    );
  }
}
