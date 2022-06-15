import React, { Component } from 'react';
import { withParams } from '../../hocs';
import StockMetalSaezService from '../../service/stock_services/StockMetalSaezService';
import { FiArrowLeft } from 'react-icons/fi'
import { auto } from '@popperjs/core';

class InfoStockMetalSaezComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            stockMetalSaez: {}
        }

    }

    componentDidMount() {
        StockMetalSaezService.getStockMetalSaezById(this.state.id).then(res => {
            this.setState({ stockMetalSaez: res.data });
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card card-line col-md-6 offset-md-3">
                    <h2 className='text-center-form'> Сведения о закупке </h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label> Наименование товара: {this.state.stockMetalSaez.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.stockMetalSaez.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Дата закупки: {this.state.stockMetalSaez.date}</label>
                        </div>
                        <div className='row'>
                            <label> Логистический коэффициент: {this.state.stockMetalSaez.coef}</label>
                        </div>
                        <div className='row'>
                            <label> Было закуплено (расч. единиц): {this.state.stockMetalSaez.quantityBought}</label>
                        </div>
                        <div className='row'>
                            <label> В наличии (расч. единиц): {this.state.stockMetalSaez.quantityCurrent}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за расч. единицу товара: {this.state.stockMetalSaez.pricePURuble}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость закупки: {this.state.stockMetalSaez.priceResult}</label>
                        </div>
                        <button className='btn btn-danger' onClick={() => this.props.navigate('/stock_metal_saez')}
                            style={{ marginTop: "10px", marginLeft: auto, marginRight: auto, display: 'block' }}> <FiArrowLeft /> </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(InfoStockMetalSaezComponent);