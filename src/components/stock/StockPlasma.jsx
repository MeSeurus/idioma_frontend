import React, { Component } from 'react';
import { FiXOctagon, FiInfo, FiShoppingCart } from 'react-icons/fi'
import StockPlasmaService from '../../service/stock_services/StockPlasmaService';
import { withParams } from '../../hocs';

class StockPlasmaComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            stockPlasma: []
        }

        this.editStockPlasma = this.editStockPlasma.bind(this);
        this.deleteStockPlasma = this.deleteStockPlasma.bind(this);
    }

    componentDidMount() {
        StockPlasmaService.getStockPlasma().then((res) => {
            this.setState({ stockPlasma: res.data });
        });
    }

    editStockPlasma(id) {
        this.props.navigate('/info_stock_plasma/' + id)
    }

    deleteStockPlasma(id) {
        StockPlasmaService.deleteStockPlasma(id).then(res => {
            this.setState({ stockPlasma: this.state.stockPlasma.filter(stockPlasma => stockPlasma.id !== id) });
        });
    }

    purchaseStockPlasma(id) {
        this.props.navigate('/purchase_plasma/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Наличие - Плазма </h2>
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
                                this.state.stockPlasma.map(
                                    stockPlasma =>
                                        <tr key={stockPlasma.id}>
                                            <td>{stockPlasma.id}</td>
                                            <td>{stockPlasma.date}</td>
                                            <td>{stockPlasma.name}</td>
                                            <td>{stockPlasma.comment}</td>
                                            <td>{stockPlasma.quantityCurrent} / {stockPlasma.quantityBought}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editStockPlasma(stockPlasma.id)} className="btn btn-info"> <FiInfo /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStockPlasma(stockPlasma.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(StockPlasmaComponent);