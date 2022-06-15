import axios from "axios";

const STOCK_ELECTRICS_BASE_URL = "http://localhost:8088/api/stock_electrics";

class StockElectricsService {

    getStockElectrics() {
        return axios.get(STOCK_ELECTRICS_BASE_URL);
    }

    createStockElectrics(stockElectrics) {
        return axios.post(STOCK_ELECTRICS_BASE_URL, stockElectrics);
    }

    getStockElectricsById(stockElectricsId) {
        return axios.get(STOCK_ELECTRICS_BASE_URL + '/' + stockElectricsId);
    }

    updateStockElectrics(stockElectrics, stockElectricsId) {
        return axios.put(STOCK_ELECTRICS_BASE_URL + '/' + stockElectricsId, stockElectrics)
    }

    deleteStockElectrics(stockElectricsId) {
        return axios.delete(STOCK_ELECTRICS_BASE_URL + '/' + stockElectricsId);
    }
}

export default new StockElectricsService()