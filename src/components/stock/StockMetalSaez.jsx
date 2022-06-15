import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FiXOctagon, FiInfo, FiShoppingCart } from 'react-icons/fi'
import StockMetalSaezService from '../../service/stock_services/StockMetalSaezService';
import { withParams } from '../../hocs';

class StockMetalSaezComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stockMetalSaez: []
        }

        this.editStockMetalSaez = this.editStockMetalSaez.bind(this);
        this.deleteStockMetalSaez = this.deleteStockMetalSaez.bind(this);
    }

    componentDidMount() {
        StockMetalSaezService.getStockMetalSaez().then((res) => {
            this.setState({ stockMetalSaez: res.data });
        });
    }

    editStockMetalSaez(id) {
        this.props.navigate('/info_stock_metal_saez/' + id)
    }

    deleteStockMetalSaez(id) {
        StockMetalSaezService.deleteStockMetalSaez(id).then(res => {
            this.setState({ stockMetalSaez: this.state.stockMetalSaez.filter(stockMetalSaez => stockMetalSaez.id !== id) });
        });
    }

    purchaseStockMetalSaez(id) {
        this.props.navigate('/purchase_metal_saez/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Наличие - Металлопрокат (SAEZ) </h2>
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
                                this.state.stockMetalSaez.map(
                                    stockMetalSaez =>
                                        <tr key={stockMetalSaez.id}>
                                            <td>{stockMetalSaez.id}</td>
                                            <td>{stockMetalSaez.date}</td>
                                            <td>{stockMetalSaez.name}</td>
                                            <td>{stockMetalSaez.comment}</td>
                                            <td>{stockMetalSaez.quantityCurrent} / {stockMetalSaez.quantityBought}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editStockMetalSaez(stockMetalSaez.id)} className="btn btn-info"> <FiInfo /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStockMetalSaez(stockMetalSaez.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(StockMetalSaezComponent);