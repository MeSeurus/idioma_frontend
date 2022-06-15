import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FiXOctagon, FiInfo, FiShoppingCart } from 'react-icons/fi'
import StockElectricsService from '../../service/stock_services/StockElectricsService';
import { withParams } from '../../hocs';

class StockElectricsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stockElectrics: []
        }

        this.editStockElectrics = this.editStockElectrics.bind(this);
        this.deleteStockElectrics = this.deleteStockElectrics.bind(this);
    }

    componentDidMount() {
        StockElectricsService.getStockElectrics().then((res) => {
            this.setState({ stockElectrics: res.data });
        });
    }

    editStockElectrics(id) {
        this.props.navigate('/info_stock_electrics/' + id)
    }

    deleteStockElectrics(id) {
        StockElectricsService.deleteStockElectrics(id).then(res => {
            this.setState({ stockElectrics: this.state.stockElectrics.filter(stockElectrics => stockElectrics.id !== id) });
        });
    }

    purchaseStockElectrics(id) {
        this.props.navigate('/purchase_electrics/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Наличие - Электрика </h2>
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
                                this.state.stockElectrics.map(
                                    stockElectrics =>
                                        <tr key={stockElectrics.id}>
                                            <td>{stockElectrics.id}</td>
                                            <td>{stockElectrics.date}</td>
                                            <td>{stockElectrics.name}</td>
                                            <td>{stockElectrics.comment}</td>
                                            <td>{stockElectrics.quantityCurrent} / {stockElectrics.quantityBought}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editStockElectrics(stockElectrics.id)} className="btn btn-info"> <FiInfo /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStockElectrics(stockElectrics.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(StockElectricsComponent);