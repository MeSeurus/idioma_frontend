import React, { Component } from 'react';
import BuyMetalImportService from '../../service/buy_services/BuyMetalImportService';
import { Link } from "react-router-dom";
import { withParams } from '../../hocs';
import { FiXOctagon, FiEdit, FiShoppingCart } from 'react-icons/fi'

class BuyMetalImportComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buyMetalImport: []
        }

        this.createBuyMetalImport = this.createBuyMetalImport.bind(this);
        this.editBuyMetalImport = this.editBuyMetalImport.bind(this);
        this.deleteBuyMetalImport = this.deleteBuyMetalImport.bind(this);
    }

    componentDidMount() {
        BuyMetalImportService.getBuyMetalImport().then((res) => {
            this.setState({ buyMetalImport: res.data });
        });
    }

    createBuyMetalImport() {
        this.props.navigate('/add_metal_import_recipe/_add');
    }

    editBuyMetalImport(id) {
        this.props.navigate('/add_metal_import_recipe/' + id)
    }

    deleteBuyMetalImport(id) {
        BuyMetalImportService.deleteBuyMetalImport(id).then(res => {
            this.setState({ buyMetalImport: this.state.buyMetalImport.filter(buyMetalImport => buyMetalImport.id !== id) });
        });
    }

    purchaseBuyMetalImport(id) {
        this.props.navigate('/purchase_metal_import/' + id)
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Закупка - Импортный металлопрокат (Прочие) </h2>
                <div className='row'>
                    <div>
                        <button className='btn menu-item' onClick={this.createBuyMetalImport}> Добавить позицию </button>
                    </div>
                </div>
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Наименование</th>
                                <th>Комментарий</th>
                                <th>Цена закупки (Евро)</th>
                                <th>Цена закупки (Руб.)</th>
                                <th>Коэффициент материала</th>
                                <th>Цена в расч. ед.</th>
                                <th width='170px'>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.buyMetalImport.map(
                                    buyMetalImport =>
                                        <tr key={buyMetalImport.id}>
                                            <td>{buyMetalImport.id}</td>
                                            <td>{buyMetalImport.name}</td>
                                            <td>{buyMetalImport.comment}</td>
                                            <td>{buyMetalImport.priceEuro}</td>
                                            <td>{buyMetalImport.priceRuble}</td>
                                            <td>{buyMetalImport.coef}</td>
                                            <td>{buyMetalImport.pricePURuble}</td>
                                            <td>
                                                <button onClick={() => this.editBuyMetalImport(buyMetalImport.id)} className="btn btn-info"> <FiEdit /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.purchaseBuyMetalImport(buyMetalImport.id)} className="btn btn-info"> <FiShoppingCart /> </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteBuyMetalImport(buyMetalImport.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(BuyMetalImportComponent);