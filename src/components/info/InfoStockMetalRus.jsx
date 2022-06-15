import React, { Component } from 'react';
import { withParams } from '../../hocs';
import StockMetalRusService from '../../service/stock_services/StockMetalRusService';
import { FiArrowLeft } from 'react-icons/fi'
import { auto } from '@popperjs/core';

class InfoStockMetalRusComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            quantity: '',
            stockMetalRus: {}
        }

    }

    componentDidMount() {
        StockMetalRusService.getStockMetalRusById(this.state.id).then(res => {
            this.setState({ stockMetalRus: res.data });
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
                            <label> Наименование товара: {this.state.stockMetalRus.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.stockMetalRus.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Дата закупки: {this.state.stockMetalRus.date}</label>
                        </div>
                        <div className='row'>
                            <label> Коэффициент материала: {this.state.stockMetalRus.coef}</label>
                        </div>
                        <div className='row'>
                            <label> Было закуплено (по каталогу. единиц): {this.state.stockMetalRus.quantityCatBought}</label>
                        </div>
                        <div className='row'>
                            <label> Было закуплено (расч. единиц): {this.state.stockMetalRus.quantityManBought}</label>
                        </div>
                        <div className='row'>
                            <label> В наличии (расч. единиц): {this.state.stockMetalRus.quantityManCurrent}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за расч. единицу товара: {this.state.stockMetalRus.pricePUMan}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость закупки: {this.state.stockMetalRus.priceResult}</label>
                        </div>
                        <button className='btn btn-danger' onClick={() => this.props.navigate('/stock_metal_rus')}
                            style={{ marginTop: "10px", marginLeft: auto, marginRight: auto, display: 'block' }}> <FiArrowLeft /> </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(InfoStockMetalRusComponent);