import React, { Component } from 'react';
import { withParams } from '../../hocs';
import StockPlasmaService from '../../service/stock_services/StockPlasmaService';
import { FiArrowLeft } from 'react-icons/fi'
import { auto } from '@popperjs/core';

class InfoStockPlasmaComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            stockPlasma: {}
        }

    }

    componentDidMount() {
        StockPlasmaService.getStockPlasmaById(this.state.id).then(res => {
            this.setState({ stockPlasma: res.data });
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
                            <label> Наименование товара: {this.state.stockPlasma.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.stockPlasma.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Дата закупки: {this.state.stockPlasma.date}</label>
                        </div>
                        <div className='row'>
                            <label> Было закуплено: {this.state.stockPlasma.quantityBought}</label>
                        </div>
                        <div className='row'>
                            <label> В наличии: {this.state.stockPlasma.quantityCurrent}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость единицы товара без работ: {this.state.stockPlasma.priceGoods}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость работ на единицу товара: {this.state.stockPlasma.priceWork}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за расч. единицу товара: {this.state.stockPlasma.pricePU}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость закупки: {this.state.stockPlasma.priceResult}</label>
                        </div>
                        <button className='btn btn-danger' onClick={() => this.props.navigate('/stock_plasma')}
                            style={{ marginTop: "10px", marginLeft: auto, marginRight: auto, display: 'block' }}> <FiArrowLeft /> </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(InfoStockPlasmaComponent);