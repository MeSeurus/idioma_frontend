import React, { Component } from 'react';
import { withParams } from '../../hocs';
import StockHardwareService from '../../service/stock_services/StockHardwareService';
import { FiArrowLeft } from 'react-icons/fi'
import { auto } from '@popperjs/core';

class InfoStockHardwareComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            stockHardware: {}
        }

    }

    componentDidMount() {
        StockHardwareService.getStockHardwareById(this.state.id).then(res => {
            this.setState({ stockHardware: res.data });
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
                            <label> Наименование товара: {this.state.stockHardware.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.stockHardware.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Дата закупки: {this.state.stockHardware.date}</label>
                        </div>
                        <div className='row'>
                            <label> Было закуплено: {this.state.stockHardware.quantityBought}</label>
                        </div>
                        <div className='row'>
                            <label> В наличии: {this.state.stockHardware.quantityCurrent}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость единицы товара без работ: {this.state.stockHardware.priceGoods}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость работ на единицу товара: {this.state.stockHardware.priceWork}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за расч. единицу товара: {this.state.stockHardware.pricePU}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость закупки: {this.state.stockHardware.priceResult}</label>
                        </div>
                        <button className='btn btn-danger' onClick={() => this.props.navigate('/stock_hardware')}
                            style={{ marginTop: "10px", marginLeft: auto, marginRight: auto, display: 'block' }}> <FiArrowLeft /> </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(InfoStockHardwareComponent);