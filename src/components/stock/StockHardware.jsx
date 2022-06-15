import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FiXOctagon, FiInfo, FiShoppingCart } from 'react-icons/fi'
import StockHardwareService from '../../service/stock_services/StockHardwareService';
import { withParams } from '../../hocs';

class StockHardwareComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stockHardware: []
        }

        this.editStockHardware = this.editStockHardware.bind(this);
        this.deleteStockHardware = this.deleteStockHardware.bind(this);
    }

    componentDidMount() {
        StockHardwareService.getStockHardware().then((res) => {
            this.setState({ stockHardware: res.data });
        });
    }

    editStockHardware(id) {
        this.props.navigate('/info_stock_hardware/' + id)
    }

    deleteStockHardware(id) {
        StockHardwareService.deleteStockHardware(id).then(res => {
            this.setState({ stockHardware: this.state.stockHardware.filter(stockHardware => stockHardware.id !== id) });
        });
    }

    purchaseStockHardware(id) {
        this.props.navigate('/purchase_hardware/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Наличие - Метизы </h2>
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
                                this.state.stockHardware.map(
                                    stockHardware =>
                                        <tr key={stockHardware.id}>
                                            <td>{stockHardware.id}</td>
                                            <td>{stockHardware.date}</td>
                                            <td>{stockHardware.name}</td>
                                            <td>{stockHardware.comment}</td>
                                            <td>{stockHardware.quantityCurrent} / {stockHardware.quantityBought}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editStockHardware(stockHardware.id)} className="btn btn-info"> <FiInfo /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStockHardware(stockHardware.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(StockHardwareComponent);