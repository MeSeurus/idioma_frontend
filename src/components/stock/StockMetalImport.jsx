import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FiXOctagon, FiInfo, FiShoppingCart } from 'react-icons/fi'
import StockMetalImportService from '../../service/stock_services/StockMetalImportService';
import { withParams } from '../../hocs';

class StockMetalImportComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stockMetalImport: []
        }

        this.editStockMetalImport = this.editStockMetalImport.bind(this);
        this.deleteStockMetalImport = this.deleteStockMetalImport.bind(this);
    }

    componentDidMount() {
        StockMetalImportService.getStockMetalImport().then((res) => {
            this.setState({ stockMetalImport: res.data });
        });
    }

    editStockMetalImport(id) {
        this.props.navigate('/info_stock_metal_import/' + id)
    }

    deleteStockMetalImport(id) {
        StockMetalImportService.deleteStockMetalImport(id).then(res => {
            this.setState({ stockMetalImport: this.state.stockMetalImport.filter(stockMetalImport => stockMetalImport.id !== id) });
        });
    }

    purchaseStockMetalImport(id) {
        this.props.navigate('/purchase_metal_import/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Наличие - Металлопрокат (Импортный) </h2>
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
                                this.state.stockMetalImport.map(
                                    stockMetalImport =>
                                        <tr key={stockMetalImport.id}>
                                            <td>{stockMetalImport.id}</td>
                                            <td>{stockMetalImport.date}</td>
                                            <td>{stockMetalImport.name}</td>
                                            <td>{stockMetalImport.comment}</td>
                                            <td>{stockMetalImport.quantityManCurrent} / {stockMetalImport.quantityManBought}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editStockMetalImport(stockMetalImport.id)} className="btn btn-info"> <FiInfo /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStockMetalImport(stockMetalImport.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(StockMetalImportComponent);