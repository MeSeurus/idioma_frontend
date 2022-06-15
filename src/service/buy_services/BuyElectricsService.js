import axios from "axios";

const BUY_ELECTRICS_BASE_URL = "http://localhost:8088/api/buy_electrics";

class BuyElectricsService {

    getBuyElectrics() {
        return axios.get(BUY_ELECTRICS_BASE_URL);
    }

    createBuyElectrics(buyElectrics) {
        return axios.post(BUY_ELECTRICS_BASE_URL, buyElectrics);
    }

    getBuyElectricsById(buyElectricsId) {
        return axios.get(BUY_ELECTRICS_BASE_URL + '/' + buyElectricsId);
    }

    updateBuyElectrics(buyElectrics, buyElectricsId) {
        return axios.put(BUY_ELECTRICS_BASE_URL + '/' + buyElectricsId, buyElectrics)
    }

    deleteBuyElectrics(buyElectricsId) {
        return axios.delete(BUY_ELECTRICS_BASE_URL + '/' + buyElectricsId);
    }
}

export default new BuyElectricsService()