import axios from "axios";

const BUY_PLASMA_BASE_URL = "http://localhost:8088/api/buy_plasma";

class BuyPlasmaService {

    getBuyPlasma() {
        return axios.get(BUY_PLASMA_BASE_URL);
    }

    createBuyPlasma(buyPlasma) {
        return axios.post(BUY_PLASMA_BASE_URL, buyPlasma);
    }

    getBuyPlasmaById(buyPlasmaId) {
        return axios.get(BUY_PLASMA_BASE_URL + '/' + buyPlasmaId);
    }

    updateBuyPlasma(buyPlasma, buyPlasmaId) {
        return axios.put(BUY_PLASMA_BASE_URL + '/' + buyPlasmaId, buyPlasma)
    }

    deleteBuyPlasma(buyPlasmaId) {
        return axios.delete(BUY_PLASMA_BASE_URL + '/' + buyPlasmaId);
    }
}

export default new BuyPlasmaService()