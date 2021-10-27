import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};  

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/user");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border=0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          Welcome Back!
                        </h1>
                      </div>
                      <Form className="user" onSubmit={this.handleLogin} ref={c => {this.form = c;}}>
                        <div className="form-group">
                          Username
                          <Input type="text" name="username" value={this.state.username} onChange={this.onChangeUsername} validations={[required]} className="form-control form-control-user"></Input>
                        </div>
                        <div className="form-group">
                          Password
                          <Input type="password" name="password" value={this.state.password} onChange={this.onChangePassword} validations={[required]} className="form-control form-control-user"></Input>
                        </div>
                        <div className="form-group">
                          <button className="btn btn-primary btn-user btn-block" disabled={this.state.loading}>
                            {this.state.loading && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                          </button>
                        </div>
                        {this.state.message && (
                          <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                              {this.state.message}
                            </div>
                          </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
                      </Form>
                      <hr></hr>
                      <div className="text-center">
                        <a className="small" href="/forgot">Forgot Password</a>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
