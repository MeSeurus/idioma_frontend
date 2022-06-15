import axios from "axios";

const STOCK_PLASMA_BASE_URL = "http://localhost:8088/api/stock_plasma";

class StockPlasmaService {

    getStockPlasma() {
        return axios.get(STOCK_PLASMA_BASE_URL);
    }

    createStockPlasma(stockPlasma) {
        return axios.post(STOCK_PLASMA_BASE_URL, stockPlasma);
    }

    getStockPlasmaById(stockPlasmaId) {
        return axios.get(STOCK_PLASMA_BASE_URL + '/' + stockPlasmaId);
    }

    updateStockPlasma(stockPlasma, stockPlasmaId) {
        return axios.put(STOCK_PLASMA_BASE_URL + '/' + stockPlasmaId, stockPlasma)
    }

    deleteStockPlasma(stockPlasmaId) {
        return axios.delete(STOCK_PLASMA_BASE_URL + '/' + stockPlasmaId);
    }
}

export default new StockPlasmaService()