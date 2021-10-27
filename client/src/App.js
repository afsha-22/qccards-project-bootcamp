import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./services/private-route";

import "./vendor/fontawesome-free/css/all.min.css";
import "./css/sb-admin-2.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import PFIQC from "./components/pfi-qc-card.component";
import DailySchedule from "./components/daily-schedule.component";
import InProgresPFI from "./components/inprogress-pfi-cards.component";
import Help from "./components/help-component";
import HelpArticle from "./components/help-article1.component";
import InProgressGeneral from "./components/inprogress-qc-cards.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import CreatePFICard from "./components/create-pfi-card.component";
import CreateGenQCCard from "./components/create-genqc-card.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: {username: ""},
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <>
        <div id="wrapper">
        <div >
          {/* Navbar */}
          <ul className="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {currentUser.username ? (
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/user">
                <img style={{ width:150 }} className="img img-responsive" src="./logo.png"></img>
            </a>
            ): (
              <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/login">
                  <img style={{ width:150 }} className="img img-responsive" src="./logo.png"></img>
              </a>
            )}
              
              <hr className="sidebar-divider my-0"></hr>
              {currentUser.username && (
              <div>
                <li className="nav-item active">
                    <a className="nav-link" href="/user">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>
                <hr className="sidebar-divider"></hr>
                <div className="sidebar-heading">
                    SAP Daily
                </div>
                <li className="nav-item">
                    <a className="nav-link" href="/daily">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Daily Schedule Items</span>
                    </a>
                </li>
                <hr className="sidebar-divider"></hr>
                <div className="sidebar-heading">
                    In Progress Cards
                </div>
                <li className="nav-item">
                    <a className="nav-link" href="/inprogresspfi">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>PFI QC Cards</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/inprogressgen">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>General QC Cards</span>
                    </a>
                </li>
                <hr className="sidebar-divider"></hr>
                <div className="sidebar-heading">
                    Cards
                </div>
                <li className="nav-item">
                    <a className="nav-link" href="/createpfi">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Create PFI QC Card</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/creategenqc">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Create General QC Card</span>
                    </a>
                </li>
              </div>
              )}
              <hr className="sidebar-divider"></hr>
              <div className="sidebar-heading">
                  General
              </div>
              <li className="nav-item">
                  <a className="nav-link" href="/help">
                      <i className="fas fa-fw fa-cog"></i>
                      <span>Help</span>
                  </a>
              </li>
              <hr className="sidebar-divider"></hr>
              {currentUser.username && (
                <div>
                  <div className="sidebar-heading">
                    Account
                  </div>
                
                <li className="nav-item">
                    <a className="nav-link" href="/login" onClick={this.logout}>
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Logout</span>
                    </a>
                </li>
              </div>
            
              )}
          </ul>
        </div>

        
          <div id="content-wrapper" className="d-flex flex-column">
            {currentUser.username && (
                <div className="d-flex flex-column">
                <div id="content">
                  <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 stati-top shadow">
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                      <i className="fa fa-bars"></i>
                    </button>
                    <form className="d-noned-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                      <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for.... ">
                        </input> 
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                    <ul class="navbar-nav ml-auto">
                      <li>
                        <i className="text-primary fas fa-user-circle fa-2x pr-2"></i>
                        <span class="mr-2 d-none d-lg-inline text-gray-600">{currentUser.email}</span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
            
            <div className="container-fluid">
            <div className="row">
              <Switch>
                {currentUser.username ?(
                  <Route exact path={["/", "/daily"]} component={DailySchedule} />
                ) : (
                  <Route exact path={"/"} component={Login} />
                )}
                
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute exact path="/createpfi" component={CreatePFICard} />
                <PrivateRoute exact path="/creategenqc" component={CreateGenQCCard} />
                <PrivateRoute exact path="/pfiqc" component={PFIQC} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/daily" component={DailySchedule} />
                <PrivateRoute exact path="/inprogresspfi" component={InProgresPFI} />
                <PrivateRoute exact path="/inprogressgen" component={InProgressGeneral} />
                <Route exact path="/help" component={Help} />
                <Route path="/user" component={BoardUser} />
                <Route path="/mod" component={BoardModerator} />
                <Route path="/admin" component={BoardAdmin} />
                <Route path="/helparticle" component={HelpArticle} />
              </Switch>
            </div>
            </div>
          </div>
        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
      </>
    );
  }
}

export default App;