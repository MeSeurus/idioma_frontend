import React, { Component } from 'react';
import { withParams } from '../../hocs';
import StockConsumablesService from '../../service/stock_services/StockConsumablesService';
import { FiArrowLeft } from 'react-icons/fi'
import { auto } from '@popperjs/core';

class InfoStockConsumablesComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            stockConsumables: {}
        }

    }

    componentDidMount() {
        StockConsumablesService.getStockConsumablesById(this.state.id).then(res => {
            this.setState({ stockConsumables: res.data });
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
                            <label> Наименование товара: {this.state.stockConsumables.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.stockConsumables.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Дата закупки: {this.state.stockConsumables.date}</label>
                        </div>
                        <div className='row'>
                            <label> Было закуплено: {this.state.stockConsumables.quantityBought}</label>
                        </div>
                        <div className='row'>
                            <label> В наличии: {this.state.stockConsumables.quantityCurrent}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость единицы товара без работ: {this.state.stockConsumables.priceGoods}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость работ на единицу товара: {this.state.stockConsumables.priceWork}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за расч. единицу товара: {this.state.stockConsumables.pricePU}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость закупки: {this.state.stockConsumables.priceResult}</label>
                        </div>
                        <button className='btn btn-danger' onClick={() => this.props.navigate('/stock_consumables')}
                            style={{ marginTop: "10px", marginLeft: auto, marginRight: auto, display: 'block' }}> <FiArrowLeft /> </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(InfoStockConsumablesComponent);