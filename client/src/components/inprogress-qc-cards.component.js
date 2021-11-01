import React, { Component } from "react";
import DialyService from "../services/daily-service";
import { Redirect } from "react-router-dom";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import PFIService from "../services/pfi-service";

export default class InProgressGeneral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            redirect: null,
            userReady: false,
            currentUser: { username: "" }
        };
    }

    handleCreatePFI(sapTicket) {
      console.log(sapTicket.vin_number);
      this.setState({ redirect: "/pfiqc?" })
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
                  <h1 class="h3 mb-0 text-gray-800">In Progress General QC Cards</h1>
                  <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                          class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
              </div>
              <div className="card shadow mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover" id="dataTable" width="100%" cellSpacing="0">
                      <thead>
                        <tr>
                          <th>Status</th>
                          <th>PFI Processing Date</th>
                          <th>Seq Number</th>
                          <th>VIN Number</th>
                          <th>MVO Number</th>
                          <th>Material Description</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                         {this.state.data.map((i) => {
                           const pfidate = new Date(i.pfi_processing_date);
                           const formatpfidate = pfidate.getDate()+"-"+pfidate.getMonth()+"-"+pfidate.getFullYear();
                          return(
                            <tr key={i.id}>
                              <td>Not Started</td>
                              <td>{formatpfidate}</td>
                              <td>{i.seq_number}</td>
                              <td>{i.vin_number}</td>
                              <td>{i.mvo_number}</td>
                              <td>{i.material_description}</td>
                              <td>
                                <button onClick={() => this.handleCreatePFI(i)} key={i.id} className="btn btn-primary" type="button">
                                  View PFI Card 
                                  </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
        );
    }
}