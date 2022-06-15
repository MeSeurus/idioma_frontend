import axios from "axios";

const STOCK_HARDWARE_BASE_URL = "http://localhost:8088/api/stock_hardware";

class StockHardwareService {

    getStockHardware() {
        return axios.get(STOCK_HARDWARE_BASE_URL);
    }

    createStockHardware(stockHardware) {
        return axios.post(STOCK_HARDWARE_BASE_URL, stockHardware);
    }

    getStockHardwareById(stockHardwareId) {
        return axios.get(STOCK_HARDWARE_BASE_URL + '/' + stockHardwareId);
    }

    updateStockHardware(stockHardware, stockHardwareId) {
        return axios.put(STOCK_HARDWARE_BASE_URL + '/' + stockHardwareId, stockHardware)
    }

    deleteStockHardware(stockHardwareId) {
        return axios.delete(STOCK_HARDWARE_BASE_URL + '/' + stockHardwareId);
    }
}

export default new StockHardwareService()