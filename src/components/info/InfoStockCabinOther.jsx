import React, { Component } from 'react';
import { withParams } from '../../hocs';
import StockCabinOtherService from '../../service/stock_services/StockCabinOtherService';
import { FiArrowLeft } from 'react-icons/fi'
import { auto } from '@popperjs/core';

class InfoStockCabinOtherComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            stockCabinOther: {}
        }

    }

    componentDidMount() {
        StockCabinOtherService.getStockCabinOtherById(this.state.id).then(res => {
            this.setState({ stockCabinOther: res.data });
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
                            <label> Наименование товара: {this.state.stockCabinOther.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.stockCabinOther.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Дата закупки: {this.state.stockCabinOther.date}</label>
                        </div>
                        <div className='row'>
                            <label> Было закуплено: {this.state.stockCabinOther.quantityBought}</label>
                        </div>
                        <div className='row'>
                            <label> В наличии: {this.state.stockCabinOther.quantityCurrent}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость закупки: {this.state.stockCabinOther.priceResult}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за расч. единицу товара: {this.state.stockCabinOther.pricePU}</label>
                        </div>
                        <button className='btn btn-danger' onClick={() => this.props.navigate('/stock_cabin_other')}
                            style={{ marginTop: "10px", marginLeft: auto, marginRight: auto, display: 'block' }}> <FiArrowLeft /> </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(InfoStockCabinOtherComponent);