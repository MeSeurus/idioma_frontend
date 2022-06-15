import axios from "axios";

const BUY_HARDWARE_BASE_URL = "http://localhost:8088/api/buy_hardware";

class BuyHardwareService {

    getBuyHardware() {
        return axios.get(BUY_HARDWARE_BASE_URL);
    }

    createBuyHardware(buyHardware) {
        return axios.post(BUY_HARDWARE_BASE_URL, buyHardware);
    }

    getBuyHardwareById(buyHardwareId) {
        return axios.get(BUY_HARDWARE_BASE_URL + '/' + buyHardwareId);
    }

    updateBuyHardware(buyHardware, buyHardwareId) {
        return axios.put(BUY_HARDWARE_BASE_URL + '/' + buyHardwareId, buyHardware)
    }

    deleteBuyHardware(buyHardwareId) {
        return axios.delete(BUY_HARDWARE_BASE_URL + '/' + buyHardwareId);
    }
}

export default new BuyHardwareService()