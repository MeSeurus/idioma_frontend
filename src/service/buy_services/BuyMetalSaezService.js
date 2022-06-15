import axios from "axios";

const BUY_METAL_SAEZ_BASE_URL = "http://localhost:8088/api/buy_metal_saez";

class BuyMetalSaezService {

    getBuyMetalSaez() {
        return axios.get(BUY_METAL_SAEZ_BASE_URL);
    }

    createBuyMetalSaez(buyMetalSaez) {
        return axios.post(BUY_METAL_SAEZ_BASE_URL, buyMetalSaez);
    }

    getBuyMetalSaezById(buyMetalSaezId) {
        return axios.get(BUY_METAL_SAEZ_BASE_URL + '/' + buyMetalSaezId);
    }

    updateBuyMetalSaez(buyMetalSaez, buyMetalSaezId) {
        return axios.put(BUY_METAL_SAEZ_BASE_URL + '/' + buyMetalSaezId, buyMetalSaez)
    }

    deleteBuyMetalSaez(buyMetalSaezId) {
        return axios.delete(BUY_METAL_SAEZ_BASE_URL + '/' + buyMetalSaezId);
    }
}

export default new BuyMetalSaezService()