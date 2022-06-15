import React, { Component } from 'react';
import BuyCabinOtherService from '../../service/buy_services/BuyCabinOtherService';
import { Link } from "react-router-dom";
import { withParams } from '../../hocs';
import { FiXOctagon, FiEdit, FiShoppingCart } from 'react-icons/fi'

class BuyCabinOtherComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buyCabinOther: []
        }

        this.createBuyCabinOther = this.createBuyCabinOther.bind(this);
        this.editBuyCabinOther = this.editBuyCabinOther.bind(this);
        this.deleteBuyCabinOther = this.deleteBuyCabinOther.bind(this);
    }

    componentDidMount() {
        BuyCabinOtherService.getBuyCabinOther().then((res) => {
            this.setState({ buyCabinOther: res.data });
        });
    }

    createBuyCabinOther() {
        this.props.navigate('/add_cabin_other_recipe/_add');
    }

    editBuyCabinOther(id) {
        this.props.navigate('/add_cabin_other_recipe/' + id)
    }

    deleteBuyCabinOther(id) {
        BuyCabinOtherService.deleteBuyCabinOther(id).then(res => {
            this.setState({ buyCabinOther: this.state.buyCabinOther.filter(buyCabinOther => buyCabinOther.id !== id) });
        });
    }

    purchaseBuyCabinOther(id) {
        this.props.navigate('/purchase_cabin_other/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Закупка - Детали для кабиины </h2>
                <div className='row'>
                    <div>
                        <button className='btn menu-item' onClick={this.createBuyCabinOther}> Добавить позицию </button>
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
                                this.state.buyCabinOther.map(
                                    buyCabinOther =>
                                        <tr key={buyCabinOther.id}>
                                            <td>{buyCabinOther.id}</td>
                                            <td>{buyCabinOther.name}</td>
                                            <td>{buyCabinOther.comment}</td>
                                            <td>{buyCabinOther.price}</td>
                                            <td>
                                                <button onClick={() => this.editBuyCabinOther(buyCabinOther.id)} className="btn btn-info"> <FiEdit /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.purchaseBuyCabinOther(buyCabinOther.id)} className="btn btn-info"> <FiShoppingCart /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBuyCabinOther(buyCabinOther.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(BuyCabinOtherComponent);