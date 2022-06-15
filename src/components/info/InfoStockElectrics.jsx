import React, { Component } from 'react';
import { withParams } from '../../hocs';
import StockElectricsService from '../../service/stock_services/StockElectricsService';
import { FiArrowLeft } from 'react-icons/fi'
import { auto } from '@popperjs/core';

class InfoStockElectricsComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            stockElectrics: {}
        }

    }

    componentDidMount() {
        StockElectricsService.getStockElectricsById(this.state.id).then(res => {
            this.setState({ stockElectrics: res.data });
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
                            <label> Наименование товара: {this.state.stockElectrics.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.stockElectrics.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Дата закупки: {this.state.stockElectrics.date}</label>
                        </div>
                        <div className='row'>
                            <label> Было закуплено: {this.state.stockElectrics.quantityBought}</label>
                        </div>
                        <div className='row'>
                            <label> В наличии: {this.state.stockElectrics.quantityCurrent}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость закупки: {this.state.stockElectrics.priceResult}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за расч. единицу товара: {this.state.stockElectrics.pricePU}</label>
                        </div>
                        <button className='btn btn-danger' onClick={() => this.props.navigate('/stock_electrics')}
                            style={{ marginTop: "10px", marginLeft: auto, marginRight: auto, display: 'block' }}> <FiArrowLeft /> </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(InfoStockElectricsComponent);