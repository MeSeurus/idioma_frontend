import axios from "axios";

const BUY_CABINOTHER_BASE_URL = "http://localhost:8088/api/buy_cabin_other";

class BuyCabinOtherService {

    getBuyCabinOther() {
        return axios.get(BUY_CABINOTHER_BASE_URL);
    }

    createBuyCabinOther(buyCabinOther) {
        return axios.post(BUY_CABINOTHER_BASE_URL, buyCabinOther);
    }

    getBuyCabinOtherById(buyCabinOtherId) {
        return axios.get(BUY_CABINOTHER_BASE_URL + '/' + buyCabinOtherId);
    }

    updateBuyCabinOther(buyCabinOther, buyCabinOtherId) {
        return axios.put(BUY_CABINOTHER_BASE_URL + '/' + buyCabinOtherId, buyCabinOther)
    }

    deleteBuyCabinOther(buyCabinOtherId) {
        return axios.delete(BUY_CABINOTHER_BASE_URL + '/' + buyCabinOtherId);
    }
}

export default new BuyCabinOtherService()