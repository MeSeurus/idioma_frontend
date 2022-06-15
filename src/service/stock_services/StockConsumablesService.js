import axios from "axios";

const STOCK_CONSUMABLES_BASE_URL = "http://localhost:8088/api/stock_consumables";

class StockConsumablesService {

    getStockConsumables() {
        return axios.get(STOCK_CONSUMABLES_BASE_URL);
    }

    createStockConsumables(stockConsumables) {
        return axios.post(STOCK_CONSUMABLES_BASE_URL, stockConsumables);
    }

    getStockConsumablesById(stockConsumablesId) {
        return axios.get(STOCK_CONSUMABLES_BASE_URL + '/' + stockConsumablesId);
    }

    updateStockConsumables(stockConsumables, stockConsumablesId) {
        return axios.put(STOCK_CONSUMABLES_BASE_URL + '/' + stockConsumablesId, stockConsumables)
    }

    deleteStockConsumables(stockConsumablesId) {
        return axios.delete(STOCK_CONSUMABLES_BASE_URL + '/' + stockConsumablesId);
    }
}

export default new StockConsumablesService()