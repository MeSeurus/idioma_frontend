import axios from "axios";

const STOCK_IMPORT_PARTS_BASE_URL = "http://localhost:8088/api/stock_import_parts";

class StockImportPartsService {

    getStockImportParts() {
        return axios.get(STOCK_IMPORT_PARTS_BASE_URL);
    }

    createStockImportParts(stockImportParts) {
        return axios.post(STOCK_IMPORT_PARTS_BASE_URL, stockImportParts);
    }

    getStockImportPartsById(stockImportPartsId) {
        return axios.get(STOCK_IMPORT_PARTS_BASE_URL + '/' + stockImportPartsId);
    }

    updateStockImportParts(stockImportParts, stockImportPartsId) {
        return axios.put(STOCK_IMPORT_PARTS_BASE_URL + '/' + stockImportPartsId, stockImportParts)
    }

    deleteStockImportParts(stockImportPartsId) {
        return axios.delete(STOCK_IMPORT_PARTS_BASE_URL + '/' + stockImportPartsId);
    }
}

export default new StockImportPartsService()