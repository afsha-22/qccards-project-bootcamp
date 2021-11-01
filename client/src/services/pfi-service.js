import axios from 'axios';
import authHeader from "./auth-header"; 

const API_URL = 'http://localhost:8080/api';

class PFIService {
    
    getInProgressPFI(mvo_num) {
        var results = [];
        return results;
    }

    getModelDetails() {
        return axios.post(API_URL + '/pfi/model', {
            mvo_number: '2Z76730A0'
        })
        .then(response => {
            if (response.data) {
              //console.log(response.data);
            }
            return response.data;
        });
    }

    getSAPDetails() {
        return axios.post(API_URL + '/pfi/schedule', {
            mvo_number: '2Z76730A0'
        })
        .then(response => {
            if (response.data) {
              //console.log(response.data);
            }
            return response.data;
        });
    }

    getModelToPFIdetails() {
        return axios.post(API_URL + '/pfi/parts', {
            mvo_number: '2Z76730A0'
        })
        .then(response => {
            if (response.data) {
              console.log(response.data);
            }
            return response.data;
        });
    }

    async getParts(partsArray){
        try{
            return await axios.post(API_URL + '/pfi/partdetails', {
                parts: partsArray
            })
            .then(response => {
                if(response.data) {
                    console.log(response.data);
                }
                return response.data;
            });
        }
        catch(err) {
            console.error(err);
        }
    }

    createPFICard(pfiDetails) {

    }
}

export default new PFIService();
