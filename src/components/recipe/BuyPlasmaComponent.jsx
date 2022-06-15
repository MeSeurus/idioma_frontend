import React, { Component } from 'react';
import BuyPlasmaService from '../../service/buy_services/BuyPlasmaService';
import { Link } from "react-router-dom";
import { withParams } from '../../hocs';
import { FiXOctagon, FiEdit, FiShoppingCart } from 'react-icons/fi'

class BuyPlasmaComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buyPlasma: []
        }

        this.createBuyPlasma = this.createBuyPlasma.bind(this);
        this.editBuyPlasma = this.editBuyPlasma.bind(this);
        this.deleteBuyPlasma = this.deleteBuyPlasma.bind(this);
    }

    componentDidMount() {
        BuyPlasmaService.getBuyPlasma().then((res) => {
            this.setState({ buyPlasma: res.data });
        });
    }

    createBuyPlasma() {
        this.props.navigate('/add_plasma_recipe/_add');
    }

    editBuyPlasma(id) {
        this.props.navigate('/add_plasma_recipe/' + id)
    }

    deleteBuyPlasma(id) {
        BuyPlasmaService.deleteBuyPlasma(id).then(res => {
            this.setState({ buyPlasma: this.state.buyPlasma.filter(buyPlasma => buyPlasma.id !== id) });
        });
    }

    purchaseBuyPlasma(id) {
        this.props.navigate('/purchase_plasma/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Закупка - Плазма </h2>
                <div className='row'>
                    <div>
                        <button className='btn menu-item' onClick={this.createBuyPlasma}> Добавить позицию </button>
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
                                this.state.buyPlasma.map(
                                    buyPlasma =>
                                        <tr key={buyPlasma.id}>
                                            <td>{buyPlasma.id}</td>
                                            <td>{buyPlasma.name}</td>
                                            <td>{buyPlasma.comment}</td>
                                            <td>{buyPlasma.priceGoods}</td>
                                            <td>{buyPlasma.priceWork}</td>
                                            <td>{buyPlasma.priceResult}</td>
                                            <td>
                                                <button onClick={() => this.editBuyPlasma(buyPlasma.id)} className="btn btn-info"> <FiEdit /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.purchaseBuyPlasma(buyPlasma.id)} className="btn btn-info"> <FiShoppingCart /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBuyPlasma(buyPlasma.id)} className="btn btn-danger"><FiXOctagon /></button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}

export default withParams(BuyPlasmaComponent);