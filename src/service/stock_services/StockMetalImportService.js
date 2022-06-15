import axios from "axios";

const STOCK_METAL_IMPORT_BASE_URL = "http://localhost:8088/api/stock_metal_import";

class StockMetalImportService {

    getStockMetalImport() {
        return axios.get(STOCK_METAL_IMPORT_BASE_URL);
    }

    createStockMetalImport(stockMetalImport) {
        return axios.post(STOCK_METAL_IMPORT_BASE_URL, stockMetalImport);
    }

    getStockMetalImportById(stockMetalImportId) {
        return axios.get(STOCK_METAL_IMPORT_BASE_URL + '/' + stockMetalImportId);
    }

    updateStockMetalImport(stockMetalImport, stockMetalImportId) {
        return axios.put(STOCK_METAL_IMPORT_BASE_URL + '/' + stockMetalImportId, stockMetalImport)
    }

    deleteStockMetalImport(stockMetalImportId) {
        return axios.delete(STOCK_METAL_IMPORT_BASE_URL + '/' + stockMetalImportId);
    }
}

export default new StockMetalImportService()