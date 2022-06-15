import axios from "axios";

const BUY_CONSUMABLES_BASE_URL = "http://localhost:8088/api/buy_consumables";

class BuyConsumablesService {

    getBuyConsumables() {
        return axios.get(BUY_CONSUMABLES_BASE_URL);
    }

    createBuyConsumables(buyConsumables) {
        return axios.post(BUY_CONSUMABLES_BASE_URL, buyConsumables);
    }

    getBuyConsumablesById(buyConsumablesId) {
        return axios.get(BUY_CONSUMABLES_BASE_URL + '/' + buyConsumablesId);
    }

    updateBuyConsumables(buyConsumables, buyConsumablesId) {
        return axios.put(BUY_CONSUMABLES_BASE_URL + '/' + buyConsumablesId, buyConsumables)
    }

    deleteBuyConsumables(buyConsumablesId) {
        return axios.delete(BUY_CONSUMABLES_BASE_URL + '/' + buyConsumablesId);
    }
}

export default new BuyConsumablesService()