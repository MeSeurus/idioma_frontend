import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FiXOctagon, FiInfo, FiShoppingCart } from 'react-icons/fi'
import StockImportPartsService from '../../service/stock_services/StockImportPartsService';
import { withParams } from '../../hocs';

class StockImportPartsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stockImportParts: []
        }

        this.editStockImportParts = this.editStockImportParts.bind(this);
        this.deleteStockImportParts = this.deleteStockImportParts.bind(this);
    }

    componentDidMount() {
        StockImportPartsService.getStockImportParts().then((res) => {
            this.setState({ stockImportParts: res.data });
        });
    }

    editStockImportParts(id) {
        this.props.navigate('/info_stock_import_parts/' + id)
    }

    deleteStockImportParts(id) {
        StockImportPartsService.deleteStockImportParts(id).then(res => {
            this.setState({ stockImportParts: this.state.stockImportParts.filter(stockImportParts => stockImportParts.id !== id) });
        });
    }

    purchaseStockImportParts(id) {
        this.props.navigate('/purchase_import_parts/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Наличие - Импортные комплектующие </h2>
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th width='130px'>Дата закупки</th>
                                <th>Наименование</th>
                                <th>Комментарий</th>
                                <th>Кол-во</th>
                                <th width='130px'>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.stockImportParts.map(
                                    stockImportParts =>
                                        <tr key={stockImportParts.id}>
                                            <td>{stockImportParts.id}</td>
                                            <td>{stockImportParts.date}</td>
                                            <td>{stockImportParts.name}</td>
                                            <td>{stockImportParts.comment}</td>
                                            <td>{stockImportParts.quantityCurrent} / {stockImportParts.quantityBought}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editStockImportParts(stockImportParts.id)} className="btn btn-info"> <FiInfo /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStockImportParts(stockImportParts.id)} className="btn btn-danger"><FiXOctagon /></button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withParams(StockImportPartsComponent);