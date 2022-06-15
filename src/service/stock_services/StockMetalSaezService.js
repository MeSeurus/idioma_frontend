import axios from "axios";

const STOCK_METAL_SAEZ_BASE_URL = "http://localhost:8088/api/stock_metal_saez";

class StockMetalSaezService {

    getStockMetalSaez() {
        return axios.get(STOCK_METAL_SAEZ_BASE_URL);
    }

    createStockMetalSaez(stockMetalSaez) {
        return axios.post(STOCK_METAL_SAEZ_BASE_URL, stockMetalSaez);
    }

    getStockMetalSaezById(stockMetalSaezId) {
        return axios.get(STOCK_METAL_SAEZ_BASE_URL + '/' + stockMetalSaezId);
    }

    updateStockMetalSaez(stockMetalSaez, stockMetalSaezId) {
        return axios.put(STOCK_METAL_SAEZ_BASE_URL + '/' + stockMetalSaezId, stockMetalSaez)
    }

    deleteStockMetalSaez(stockMetalSaezId) {
        return axios.delete(STOCK_METAL_SAEZ_BASE_URL + '/' + stockMetalSaezId);
    }
}

export default new StockMetalSaezService()