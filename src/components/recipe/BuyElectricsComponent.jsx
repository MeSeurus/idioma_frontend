import React, { Component } from 'react';
import BuyElectricsService from '../../service/buy_services/BuyElectricsService';
import { Link } from "react-router-dom";
import { withParams } from '../../hocs';
import { FiXOctagon, FiEdit, FiShoppingCart } from 'react-icons/fi'

class BuyElectricsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buyElectrics: []
        }

        this.createBuyElectrics = this.createBuyElectrics.bind(this);
        this.editBuyElectrics = this.editBuyElectrics.bind(this);
        this.deleteBuyElectrics = this.deleteBuyElectrics.bind(this);
    }

    componentDidMount() {
        BuyElectricsService.getBuyElectrics().then((res) => {
            this.setState({ buyElectrics: res.data });
        });
    }

    createBuyElectrics() {
        this.props.navigate('/add_electrics_recipe/_add');
    }

    editBuyElectrics(id) {
        this.props.navigate('/add_electrics_recipe/' + id)
    }

    deleteBuyElectrics(id) {
        BuyElectricsService.deleteBuyElectrics(id).then(res => {
            this.setState({ buyElectrics: this.state.buyElectrics.filter(buyElectrics => buyElectrics.id !== id) });
        });
    }

    purchaseBuyElectrics(id) {
        this.props.navigate('/purchase_electrics/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Закупка - Электрика </h2>
                <div className='row'>
                    <div>
                        <button className='btn menu-item' onClick={this.createBuyElectrics}> Добавить позицию </button>
                    </div>
                </div>
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Наименование</th>
                                <th>Комментарий</th>
                                <th>Цена</th>
                                <th width='170px'>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.buyElectrics.map(
                                    buyElectrics =>
                                        <tr key={buyElectrics.id}>
                                            <td>{buyElectrics.id}</td>
                                            <td>{buyElectrics.name}</td>
                                            <td>{buyElectrics.comment}</td>
                                            <td>{buyElectrics.price}</td>
                                            <td>
                                                <button onClick={() => this.editBuyElectrics(buyElectrics.id)} className="btn btn-info"> <FiEdit /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.purchaseBuyElectrics(buyElectrics.id)} className="btn btn-info"> <FiShoppingCart /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBuyElectrics(buyElectrics.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(BuyElectricsComponent);