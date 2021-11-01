import React, { Component } from "react";
import DialyService from "../services/daily-service";
import { Redirect } from "react-router-dom";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import PFIService from "../services/pfi-service";

export default class CreateGenQCCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            redirect: null,
            userReady: false,
            currentUser: { username: "" }
        };
    }

    handleCreatePFI() {
        //browserHistory.push("/pfiqc");
      //this.setState({ redirect: "/pfiqc" })
    }

    componentDidMount() {
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser)
      {
       this.setState({ redirect: "/login" });
      }
      else 
      {
        this.setState({ currentUser: currentUser, userReady: true })
        DialyService.getDailySchedule().then(
          response => {
            this.setState({
              data: response.data
            });
          },
          error => {
            this.setState({
              content:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            });
    
            if (error.response && error.response.status === 401) {
              EventBus.dispatch("logout");
            }
          }
        );
      }
      
    }
    render() {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }

        return (
            <>
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">Create General QC Card</h1>
              </div>
              <div className="card shadow mb-4">
                        <div className="card-body">
                        <div className="d-flex flex-column">
                    <div id="content">
                        
                        

                        <form action="/pfiqc">
                        <div>Enter MVO Number</div>
                            <div className="input-group">
                            
                            <div>
                            <input type="text" className="form-control border-2">
                            </input> 
                            </div>
                            <div className="input-group-append">
                                <a href="/pfiqc" className="btn btn-primary" >
                                    <i className="fas fa-search fa-sm"></i>
                                </a>
                            </div>
                            </div>
                        </form>

                    </div>
                    </div>
                </div>
              </div>
            </>
        );
    }
}