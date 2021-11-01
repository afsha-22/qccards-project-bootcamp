import React, { Component } from "react";
import PFIService from "../services/pfi-service";
import { Redirect } from "react-router-dom";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

export default class PFICard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modeldetails: {},
            sapdetails: {},
            parts: [],
            partDetails: [],
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
            pficard: {
              judge: {
                ok: false,
                ng: false
              },
              declare: {
                type: "",
                code: "",
                comments: ""
              },
              correction: {
                date: "",
                zone: "",
                who: "",
                comments: ""
              }
            }
        };
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
          PFIService.getModelDetails().then(
            response => {
              this.setState({
                modeldetails: response
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
          )
          .then(
            PFIService.getSAPDetails().then(
              response => {
                this.setState({
                  sapdetails: response
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
            )
          )
          .then(
            PFIService.getModelToPFIdetails().then(
              response => {
                var partsArray = [];
                console.log(response);
                response.map((item, i)=> {
                  console.log(item.pfi_number);
                  partsArray.push(item.pfi_number);
                });
                console.log(partsArray);
                this.setState({
                  parts: partsArray
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
            )
          )
          .then(
            PFIService.getParts(this.state.parts).then(
              response => {
                this.setState({
                  partDetails: response
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
            )
          )
        }
        
      }

      render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
          const pfidate = new Date(this.state.sapdetails.pfi_processing_date);
          const formatpfidate = pfidate.getDate()+"-"+pfidate.getMonth()+"-"+pfidate.getFullYear();
          return(
            <div className="container-fluid">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h2 className="m-0 font-weight-bold text-primary">PORT FIT Installation (PFI) QC Linecard</h2>
                    </div>
                </div>
                <div className="row shadow mb-4 py-3">
                  <div className="col-lg-8">
                    <button className="btn btn-lg btn-primary" type="submit">Save</button>
                    <button className="btn btn-lg btn-secondary" type="submit">Cancel</button>
                  </div>
                </div>
                <div className="card mb-3">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">General Details</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                          <form>
                            {/*Row-1 */}
                            <div className="row py-3">
                              <div className="col-sm-2">
                                Brand
                                <input type="text" className="form-control" value={this.state.modeldetails.brand} readOnly></input>
                              </div>
                              <div className="col-sm-2">
                                Model
                                <input type="text" className="form-control" value={this.state.modeldetails.model} readOnly></input>
                              </div>
                              <div className="col-sm-2">
                                Katashi
                                <input type="text" className="form-control" value={this.state.modeldetails.tmckatashi} readOnly></input>
                              </div>
                              <div className="col-sm-2">
                                VIN
                                <input type="text" className="form-control" value={this.state.sapdetails.vin_number} readOnly></input>
                              </div>
                              <div className="col-sm-2">
                                SEQ
                                <input type="text" className="form-control" value={this.state.sapdetails.seq_number} readOnly></input>
                              </div>
                              <div className="col-sm-2">
                                PF in Date
                                <input type="text" className="form-control" value={formatpfidate} readOnly></input>
                              </div>
                            </div>
                            {/*Row-1 */}
                            <div className="row py-3">
                            <div className="col-sm-2">
                                MVO
                                <input type="text" className="form-control" value={this.state.modeldetails.mvo_number} readOnly></input>
                              </div>
                              <div className="col-sm-2">
                                Inspector
                                <input type="text" className="form-control" value={this.state.currentUser.username} readOnly></input>
                              </div>
                              <div className="col-sm-2">
                                PF QC Date
                                <input type="date" className="form-control"></input>
                              </div>
                            </div>
                          </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card mb-3">
                      {this.state.partDetails.map((i) => {
                            return(
                              <>
                              <div className="card-header border-left-dark py-3 mb-3">
                                  <h6 className="m-0 font-weight-bold text-dark">
                                    <span className="py-3 mr-3">{i.location}</span>
                                    <span className="py-3 mr-3">|</span>
                                    <span className="py-3 mr-3">{i.part_name}</span>
                                    <span className="py-3 mr-3">|</span>
                                    <span className="py-3 mr-3">{i.part_number}</span>
                                  </h6>
                              </div>
                              <div className="card-body">
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="col-sm-6">
                                        Appearance
                                        <input type="text" className="form-control" value={i.apperance}></input>
                                      </div>
                                      <div className="col-sm-6">
                                        Function
                                        <input type="text" className="form-control" value={i.function}></input>
                                      </div>
                                    </div>
                                    <div className="col-lg-12 py-3 mt=3">
                                    <div className="row">
                                      <div className="col-lg-4">
                                        <div className="card mb-3 ">
                                          <div className="card-header border-left-warning py-3">
                                              <h6 className="m-0 font-weight-bold text-secondary">Judge</h6>
                                          </div>
                                          <div className="card-body">
                                              <div className="row">
                                                <div className="col-md-6 ml-3">
                                                  <input type="checkbox" name="judgeok" id="judgeok" className="form-check-input" value={this.state.pficard.judge.ok}></input>
                                                  <label className="form-check-label" for="judgeok">OK ?</label>
                                                </div>
                                                <div className="col-md-6 ml-3">
                                                  <input type="checkbox" name="judgeng" id="judgeng" className="form-check-input" value={this.state.pficard.judge.ng}></input>
                                                  <label className="form-check-label" for="judgeng">Not Good ?</label>
                                                </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="card mb-3 ">
                                          <div className="card-header border-left-danger py-3">
                                              <h6 className="m-0 font-weight-bold text-secondary">Defect Declaration</h6>
                                          </div>
                                          <div className="card-body">
                                              <div className="row">
                                                <div className="col-md-4 ml-3">
                                                  Defect Type
                                                  <select value={this.state.pficard.declare.type} class="form-select">
                                                    <option value="1">Broken</option>
                                                    <option value="2">Cracked</option>
                                                    <option value="3">Damaged</option>
                                                    <option value="3">Corrosion</option>
                                                    <option value="3">Abnormal</option>
                                                    <option value="3">Bent</option>
                                                  </select>
                                                </div>
                                                <div className="col-md-7 ml-3">
                                                  Upload Photo
                                                  <input type="file" name="file" className="form-control"></input>
                                                </div>
                                                <div className="col-md-10 ml-3">
                                                  Comments  
                                                  <textarea className="form-control" name="comments" row="4" cols="80"></textarea>
                                                </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="card mb-3 ">
                                          <div className="card-header border-left-success py-3">
                                              <h6 className="m-0 font-weight-bold text-secondary">Defect Corrected</h6>
                                          </div>
                                          <div className="card-body">
                                          <div className="row">
                                              <div className="col-md-4 ml-3">
                                                  Date
                                                  <input type="date" name="correcteddt" className="form-control"></input>
                                                </div>
                                                <div className="col-md-4 ml-3">
                                                  Zone
                                                  <input type="text" name="zone" className="form-control"></input>
                                                </div>
                                                <div className="col-md-4 ml-3">
                                                  Who
                                                  <input type="text" name="who" className="form-control" value={this.state.currentUser.username}></input>
                                                </div>
                                                <div className="col-md-7 ml-3">
                                                  Upload Photo
                                                  <input type="file" name="file" className="form-control"></input>
                                                </div>
                                                <div className="col-md-10 ml-3">
                                                  Comments  
                                                  <textarea className="form-control" name="comments" row="4" cols="80"></textarea>
                                                </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    </div>
                                  </div>
                                  <button className="btn btn-primary" type="submit">Save</button>
                              </div>
                              </>
                            )
                        }
                      )}
                    </div>
                  </div>
                </div>
            </div>
          )
      }
}