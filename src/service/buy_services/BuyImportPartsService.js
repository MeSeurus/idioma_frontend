import axios from "axios";

const BUY_IMPORT_PARTS_BASE_URL = "http://localhost:8088/api/buy_import_parts";

class BuyImportPartsService {

    getBuyImportParts() {
        return axios.get(BUY_IMPORT_PARTS_BASE_URL);
    }

    createBuyImportParts(buyImportParts) {
        return axios.post(BUY_IMPORT_PARTS_BASE_URL, buyImportParts);
    }

    getBuyImportPartsById(buyImportPartsId) {
        return axios.get(BUY_IMPORT_PARTS_BASE_URL + '/' + buyImportPartsId);
    }

    updateBuyImportParts(buyImportParts, buyImportPartsId) {
        return axios.put(BUY_IMPORT_PARTS_BASE_URL + '/' + buyImportPartsId, buyImportParts)
    }

    deleteBuyImportParts(buyImportPartsId) {
        return axios.delete(BUY_IMPORT_PARTS_BASE_URL + '/' + buyImportPartsId);
    }
}

export default new BuyImportPartsService()