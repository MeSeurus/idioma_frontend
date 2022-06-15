import React, { Component } from 'react';
import BuyMetalRusService from '../../service/buy_services/BuyMetalRusService';
import { Link } from "react-router-dom";
import { withParams } from '../../hocs';
import { FiXOctagon, FiEdit, FiShoppingCart } from 'react-icons/fi'

class BuyMetalRusComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buyMetalRus: []
        }

        this.createBuyMetalRus = this.createBuyMetalRus.bind(this);
        this.editBuyMetalRus = this.editBuyMetalRus.bind(this);
        this.deleteBuyMetalRus = this.deleteBuyMetalRus.bind(this);
    }

    componentDidMount() {
        BuyMetalRusService.getBuyMetalRus().then((res) => {
            this.setState({ buyMetalRus: res.data });
        });
    }

    createBuyMetalRus() {
        this.props.navigate('/add_metal_rus_recipe/_add');
    }

    editBuyMetalRus(id) {
        this.props.navigate('/add_metal_rus_recipe/' + id)
    }

    deleteBuyMetalRus(id) {
        BuyMetalRusService.deleteBuyMetalRus(id).then(res => {
            this.setState({ buyMetalRus: this.state.buyMetalRus.filter(buyMetalRus => buyMetalRus.id !== id) });
        });
    }

    purchaseBuyMetalRus(id) {
        this.props.navigate('/purchase_metal_rus/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Закупка - Российский металлопрокат </h2>
                <div className='row'>
                    <div>
                        <button className='btn menu-item' onClick={this.createBuyMetalRus}> Добавить позицию </button>
                    </div>
                </div>
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Наименование</th>
                                <th>Комментарий</th>
                                <th>Цена закупки</th>
                                <th>Коэффициент материала</th>
                                <th>Цена в расч. ед.</th>
                                <th width='170px'>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.buyMetalRus.map(
                                    buyMetalRus =>
                                        <tr key={buyMetalRus.id}>
                                            <td>{buyMetalRus.id}</td>
                                            <td>{buyMetalRus.name}</td>
                                            <td>{buyMetalRus.comment}</td>
                                            <td>{buyMetalRus.priceRuble}</td>
                                            <td>{buyMetalRus.coef}</td>
                                            <td>{buyMetalRus.pricePURuble}</td>
                                            <td>
                                                <button onClick={() => this.editBuyMetalRus(buyMetalRus.id)} className="btn btn-info"> <FiEdit /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.purchaseBuyMetalRus(buyMetalRus.id)} className="btn btn-info"> <FiShoppingCart /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBuyMetalRus(buyMetalRus.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(BuyMetalRusComponent);