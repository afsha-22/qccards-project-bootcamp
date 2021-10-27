import axios from 'axios';
import authHeader from "./auth-header"; 

const API_URL = 'http://localhost:8080/api';

class DailyService {
    getDailySchedule() {
        return axios.get(API_URL + '/daily');
    }
}

export default new DailyService();
