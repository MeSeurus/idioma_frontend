import React, { Component } from 'react';
import BuyConsumablesService from '../../service/buy_services/BuyConsumablesService';
import { Link } from "react-router-dom";
import { withParams } from '../../hocs';
import { FiXOctagon, FiEdit, FiShoppingCart } from 'react-icons/fi'

class BuyConsumablesComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buyConsumables: []
        }

        this.createBuyConsumables = this.createBuyConsumables.bind(this);
        this.editBuyConsumables = this.editBuyConsumables.bind(this);
        this.deleteBuyConsumables = this.deleteBuyConsumables.bind(this);
    }

    componentDidMount() {
        BuyConsumablesService.getBuyConsumables().then((res) => {
            this.setState({ buyConsumables: res.data });
        });
    }

    createBuyConsumables() {
        this.props.navigate('/add_consumables_recipe/_add');
    }

    editBuyConsumables(id) {
        this.props.navigate('/add_consumables_recipe/' + id)
    }

    deleteBuyConsumables(id) {
        BuyConsumablesService.deleteBuyConsumables(id).then(res => {
            this.setState({ buyConsumables: this.state.buyConsumables.filter(buyConsumables => buyConsumables.id !== id) });
        });
    }

    purchaseBuyConsumables(id) {
        this.props.navigate('/purchase_consumables/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Закупка - Расходные материалы </h2>
                <div className='row'>
                    <div>
                        <button className='btn menu-item' onClick={this.createBuyConsumables}> Добавить позицию </button>
                    </div>
                </div>
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Наименование</th>
                                <th>Комментарий</th>
                                <th>Цена (Товар)</th>
                                <th>Цена (Работы)</th>
                                <th>Цена (Итог)</th>
                                <th width='170px'>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.buyConsumables.map(
                                    buyConsumables =>
                                        <tr key={buyConsumables.id}>
                                            <td>{buyConsumables.id}</td>
                                            <td>{buyConsumables.name}</td>
                                            <td>{buyConsumables.comment}</td>
                                            <td>{buyConsumables.priceGoods}</td>
                                            <td>{buyConsumables.priceWork}</td>
                                            <td>{buyConsumables.priceResult}</td>
                                            <td>
                                                <button onClick={() => this.editBuyConsumables(buyConsumables.id)} className="btn btn-info"> <FiEdit /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.purchaseBuyConsumables(buyConsumables.id)} className="btn btn-info"> <FiShoppingCart /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBuyConsumables(buyConsumables.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(BuyConsumablesComponent);