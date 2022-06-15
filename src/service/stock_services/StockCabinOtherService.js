import axios from "axios";

const STOCK_CABIN_OTHER_BASE_URL = "http://localhost:8088/api/stock_cabin_other";

class StockCabinOtherService {

    getStockCabinOther() {
        return axios.get(STOCK_CABIN_OTHER_BASE_URL);
    }

    createStockCabinOther(stockCabinOther) {
        return axios.post(STOCK_CABIN_OTHER_BASE_URL, stockCabinOther);
    }

    getStockCabinOtherById(stockCabinOtherId) {
        return axios.get(STOCK_CABIN_OTHER_BASE_URL + '/' + stockCabinOtherId);
    }

    updateStockCabinOther(stockCabinOther, stockCabinOtherId) {
        return axios.put(STOCK_CABIN_OTHER_BASE_URL + '/' + stockCabinOtherId, stockCabinOther)
    }

    deleteStockCabinOther(stockCabinOtherId) {
        return axios.delete(STOCK_CABIN_OTHER_BASE_URL + '/' + stockCabinOtherId);
    }
}

export default new StockCabinOtherService()