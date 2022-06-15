import axios from "axios";

const BUY_METAL_IMPORT_BASE_URL = "http://localhost:8088/api/buy_metal_import";

class BuyMetalImportService {

    getBuyMetalImport() {
        return axios.get(BUY_METAL_IMPORT_BASE_URL);
    }

    createBuyMetalImport(buyMetalImport) {
        return axios.post(BUY_METAL_IMPORT_BASE_URL, buyMetalImport);
    }

    getBuyMetalImportById(buyMetalImportId) {
        return axios.get(BUY_METAL_IMPORT_BASE_URL + '/' + buyMetalImportId);
    }

    updateBuyMetalImport(buyMetalImport, buyMetalImportId) {
        return axios.put(BUY_METAL_IMPORT_BASE_URL + '/' + buyMetalImportId, buyMetalImport)
    }

    deleteBuyMetalImport(buyMetalImportId) {
        return axios.delete(BUY_METAL_IMPORT_BASE_URL + '/' + buyMetalImportId);
    }
}

export default new BuyMetalImportService()