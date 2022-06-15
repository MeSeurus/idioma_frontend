import React, { Component } from 'react';
import BuyImportPartsService from '../../service/buy_services/BuyImportPartsService';
import { Link } from "react-router-dom";
import { withParams } from '../../hocs';
import { FiXOctagon, FiEdit, FiShoppingCart } from 'react-icons/fi'

class BuyImportPartsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buyImportParts: []
        }

        this.createBuyImportParts = this.createBuyImportParts.bind(this);
        this.editBuyImportParts = this.editBuyImportParts.bind(this);
        this.deleteBuyImportParts = this.deleteBuyImportParts.bind(this);
    }

    componentDidMount() {
        BuyImportPartsService.getBuyImportParts().then((res) => {
            this.setState({ buyImportParts: res.data });
        });
    }

    createBuyImportParts() {
        this.props.navigate('/add_import_parts_recipe/_add');
    }

    editBuyImportParts(id) {
        this.props.navigate('/add_import_parts_recipe/' + id)
    }

    deleteBuyImportParts(id) {
        BuyImportPartsService.deleteBuyImportParts(id).then(res => {
            this.setState({ buyImportParts: this.state.buyImportParts.filter(buyImportParts => buyImportParts.id !== id) });
        });
    }

    purchaseBuyImportParts(id) {
        this.props.navigate('/purchase_import_parts/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Закупка - Импортные комплектующие </h2>
                <div className='row'>
                    <div>
                        <button className='btn menu-item' onClick={this.createBuyImportParts}> Добавить позицию </button>
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
                                this.state.buyImportParts.map(
                                    buyImportParts =>
                                        <tr key={buyImportParts.id}>
                                            <td>{buyImportParts.id}</td>
                                            <td>{buyImportParts.name}</td>
                                            <td>{buyImportParts.comment}</td>
                                            <td>{buyImportParts.price}</td>
                                            <td>
                                                <button onClick={() => this.editBuyImportParts(buyImportParts.id)} className="btn btn-info"> <FiEdit /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.purchaseBuyImportParts(buyImportParts.id)} className="btn btn-info"> <FiShoppingCart /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBuyImportParts(buyImportParts.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(BuyImportPartsComponent);