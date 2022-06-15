import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FiXOctagon, FiInfo, FiShoppingCart } from 'react-icons/fi'
import StockConsumablesService from '../../service/stock_services/StockConsumablesService';
import { withParams } from '../../hocs';

class StockConsumablesComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stockConsumables: []
        }

        this.editStockConsumables = this.editStockConsumables.bind(this);
        this.deleteStockConsumables = this.deleteStockConsumables.bind(this);
    }

    componentDidMount() {
        StockConsumablesService.getStockConsumables().then((res) => {
            this.setState({ stockConsumables: res.data });
        });
    }

    editStockConsumables(id) {
        this.props.navigate('/info_stock_consumables/' + id)
    }

    deleteStockConsumables(id) {
        StockConsumablesService.deleteStockConsumables(id).then(res => {
            this.setState({ stockConsumables: this.state.stockConsumables.filter(stockConsumables => stockConsumables.id !== id) });
        });
    }

    purchaseStockConsumables(id) {
        this.props.navigate('/purchase_consumables/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Наличие - Расходные материалы </h2>
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
                                this.state.stockConsumables.map(
                                    stockConsumables =>
                                        <tr key={stockConsumables.id}>
                                            <td>{stockConsumables.id}</td>
                                            <td>{stockConsumables.date}</td>
                                            <td>{stockConsumables.name}</td>
                                            <td>{stockConsumables.comment}</td>
                                            <td>{stockConsumables.quantityCurrent} / {stockConsumables.quantityBought}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editStockConsumables(stockConsumables.id)} className="btn btn-info"> <FiInfo /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStockConsumables(stockConsumables.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(StockConsumablesComponent);