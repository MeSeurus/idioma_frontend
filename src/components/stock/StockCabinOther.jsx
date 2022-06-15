import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FiXOctagon, FiInfo, FiShoppingCart } from 'react-icons/fi'
import StockCabinOtherService from '../../service/stock_services/StockCabinOtherService';
import { withParams } from '../../hocs';

class StockCabinOtherComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stockCabinOther: []
        }

        this.editStockCabinOther = this.editStockCabinOther.bind(this);
        this.deleteStockCabinOther = this.deleteStockCabinOther.bind(this);
    }

    componentDidMount() {
        StockCabinOtherService.getStockCabinOther().then((res) => {
            this.setState({ stockCabinOther: res.data });
        });
    }

    editStockCabinOther(id) {
        this.props.navigate('/info_stock_cabin_other/' + id)
    }

    deleteStockCabinOther(id) {
        StockCabinOtherService.deleteStockCabinOther(id).then(res => {
            this.setState({ stockCabinOther: this.state.stockCabinOther.filter(stockCabinOther => stockCabinOther.id !== id) });
        });
    }

    purchaseStockCabinOther(id) {
        this.props.navigate('/purchase_cabin_other/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Наличие - Детали для кабиины </h2>
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
                                this.state.stockCabinOther.map(
                                    stockCabinOther =>
                                        <tr key={stockCabinOther.id}>
                                            <td>{stockCabinOther.id}</td>
                                            <td>{stockCabinOther.date}</td>
                                            <td>{stockCabinOther.name}</td>
                                            <td>{stockCabinOther.comment}</td>
                                            <td>{stockCabinOther.quantityCurrent} / {stockCabinOther.quantityBought}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editStockCabinOther(stockCabinOther.id)} className="btn btn-info"> <FiInfo /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStockCabinOther(stockCabinOther.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(StockCabinOtherComponent);