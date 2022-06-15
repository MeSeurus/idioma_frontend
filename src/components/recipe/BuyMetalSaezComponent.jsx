import React, { Component } from 'react';
import BuyMetalSaezService from '../../service/buy_services//BuyMetalSaezService';
import { Link } from "react-router-dom";
import { withParams } from '../../hocs';
import { FiXOctagon, FiEdit, FiShoppingCart } from 'react-icons/fi'

class BuyMetalSaezComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buyMetalSaez: []
        }

        this.createBuyMetalSaez = this.createBuyMetalSaez.bind(this);
        this.editBuyMetalSaez = this.editBuyMetalSaez.bind(this);
        this.deleteBuyMetalSaez = this.deleteBuyMetalSaez.bind(this);
    }

    componentDidMount() {
        BuyMetalSaezService.getBuyMetalSaez().then((res) => {
            this.setState({ buyMetalSaez: res.data });
        });
    }

    createBuyMetalSaez() {
        this.props.navigate('/add_metal_saez_recipe/_add');
    }

    editBuyMetalSaez(id) {
        this.props.navigate('/add_metal_saez_recipe/' + id)
    }

    deleteBuyMetalSaez(id) {
        BuyMetalSaezService.deleteBuyMetalSaez(id).then(res => {
            this.setState({ buyMetalSaez: this.state.buyMetalSaez.filter(buyMetalSaez => buyMetalSaez.id !== id) });
        });
    }

    purchaseBuyMetalSaez(id) {
        this.props.navigate('/purchase_metal_saez/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Закупка - Металлопрокат (SAEZ) </h2>
                <div className='row'>
                    <div>
                        <button className='btn menu-item' onClick={this.createBuyMetalSaez}> Добавить позицию </button>
                    </div>
                </div>
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Наименование</th>
                                <th>Комментарий</th>
                                <th>Цена (Евро)</th>
                                <th>Логистика (коэф.)</th>
                                <th>Итог (Руб.)</th>
                                <th width='170px'>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.buyMetalSaez.map(
                                    buyMetalSaez =>
                                        <tr key={buyMetalSaez.id}>
                                            <td>{buyMetalSaez.id}</td>
                                            <td>{buyMetalSaez.name}</td>
                                            <td>{buyMetalSaez.comment}</td>
                                            <td>{buyMetalSaez.priceEuro}</td>
                                            <td>{buyMetalSaez.coef}</td>
                                            <td>{buyMetalSaez.priceRuble}</td>
                                            <td>
                                                <button onClick={() => this.editBuyMetalSaez(buyMetalSaez.id)} className="btn btn-info"> <FiEdit /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.purchaseBuyMetalSaez(buyMetalSaez.id)} className="btn btn-info"> <FiShoppingCart /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBuyMetalSaez(buyMetalSaez.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(BuyMetalSaezComponent);