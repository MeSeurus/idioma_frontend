import axios from "axios";

const LEFTOVER_BASE_URL = "http://localhost:8088/api/leftovers";

class LeftoversService {

    getLeftovers() {
        return axios.get(LEFTOVER_BASE_URL);
    }

    createLeftovers(leftovers) {
        return axios.post(LEFTOVER_BASE_URL, leftovers);
    }

    getLeftoversById(leftoversId) {
        return axios.get(LEFTOVER_BASE_URL + '/' + leftoversId);
    }

    updateLeftovers(leftovers, leftoversId) {
        return axios.put(LEFTOVER_BASE_URL + '/' + leftoversId, leftovers)
    }

    deleteLeftovers(leftoversId) {
        return axios.delete(LEFTOVER_BASE_URL + '/' + leftoversId);
    }
}

export default new LeftoversService()