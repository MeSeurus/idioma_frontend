import React, { Component } from 'react';
import BuyHardwareService from '../../service/buy_services/BuyHardwareService';
import { Link } from "react-router-dom";
import { withParams } from '../../hocs';
import { FiXOctagon, FiEdit, FiShoppingCart } from 'react-icons/fi'

class BuyHardwareComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buyHardware: []
        }

        this.createBuyHardware = this.createBuyHardware.bind(this);
        this.editBuyHardware = this.editBuyHardware.bind(this);
        this.deleteBuyHardware = this.deleteBuyHardware.bind(this);
    }

    componentDidMount() {
        BuyHardwareService.getBuyHardware().then((res) => {
            this.setState({ buyHardware: res.data });
        });
    }

    createBuyHardware() {
        this.props.navigate('/add_hardware_recipe/_add');
    }

    editBuyHardware(id) {
        this.props.navigate('/add_hardware_recipe/' + id)
    }

    deleteBuyHardware(id) {
        BuyHardwareService.deleteBuyHardware(id).then(res => {
            this.setState({ buyHardware: this.state.buyHardware.filter(buyHardware => buyHardware.id !== id) });
        });
    }

    purchaseBuyHardware(id) {
        this.props.navigate('/purchase_hardware/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Закупка - Метизы </h2>
                <div className='row'>
                    <div>
                        <button className='btn menu-item' onClick={this.createBuyHardware}> Добавить позицию </button>
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
                                this.state.buyHardware.map(
                                    buyHardware =>
                                        <tr key={buyHardware.id}>
                                            <td>{buyHardware.id}</td>
                                            <td>{buyHardware.name}</td>
                                            <td>{buyHardware.comment}</td>
                                            <td>{buyHardware.priceGoods}</td>
                                            <td>{buyHardware.priceWork}</td>
                                            <td>{buyHardware.priceResult}</td>
                                            <td>
                                                <button onClick={() => this.editBuyHardware(buyHardware.id)} className="btn btn-info"> <FiEdit /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.purchaseBuyHardware(buyHardware.id)} className="btn btn-info"> <FiShoppingCart /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBuyHardware(buyHardware.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(BuyHardwareComponent);