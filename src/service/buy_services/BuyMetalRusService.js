import axios from "axios";

const BUY_METAL_RUS_BASE_URL = "http://localhost:8088/api/buy_metal_rus";

class BuyMetalRusService {

    getBuyMetalRus() {
        return axios.get(BUY_METAL_RUS_BASE_URL);
    }

    createBuyMetalRus(buyMetalRus) {
        return axios.post(BUY_METAL_RUS_BASE_URL, buyMetalRus);
    }

    getBuyMetalRusById(buyMetalRusId) {
        return axios.get(BUY_METAL_RUS_BASE_URL + '/' + buyMetalRusId);
    }

    updateBuyMetalRus(buyMetalRus, buyMetalRusId) {
        return axios.put(BUY_METAL_RUS_BASE_URL + '/' + buyMetalRusId, buyMetalRus)
    }

    deleteBuyMetalRus(buyMetalRusId) {
        return axios.delete(BUY_METAL_RUS_BASE_URL + '/' + buyMetalRusId);
    }
}

export default new BuyMetalRusService()