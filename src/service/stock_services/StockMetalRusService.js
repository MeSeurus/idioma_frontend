import axios from "axios";

const STOCK_METAL_RUS_BASE_URL = "http://localhost:8088/api/stock_metal_rus";

class StockMetalRusService {

    getStockMetalRus() {
        return axios.get(STOCK_METAL_RUS_BASE_URL);
    }

    createStockMetalRus(stockMetalRus) {
        return axios.post(STOCK_METAL_RUS_BASE_URL, stockMetalRus);
    }

    getStockMetalRusById(stockMetalRusId) {
        return axios.get(STOCK_METAL_RUS_BASE_URL + '/' + stockMetalRusId);
    }

    updateStockMetalRus(stockMetalRus, stockMetalRusId) {
        return axios.put(STOCK_METAL_RUS_BASE_URL + '/' + stockMetalRusId, stockMetalRus)
    }

    deleteStockMetalRus(stockMetalRusId) {
        return axios.delete(STOCK_METAL_RUS_BASE_URL + '/' + stockMetalRusId);
    }
}

export default new StockMetalRusService()