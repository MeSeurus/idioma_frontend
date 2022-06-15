import React, { Component } from 'react';
import { withParams } from '../../hocs';
import StockImportPartsService from '../../service/stock_services/StockImportPartsService';
import { FiArrowLeft } from 'react-icons/fi'
import { auto } from '@popperjs/core';

class InfoStockImportPartsComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            stockImportParts: {}
        }

    }

    componentDidMount() {
        StockImportPartsService.getStockImportPartsById(this.state.id).then(res => {
            this.setState({ stockImportParts: res.data });
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
                            <label> Наименование товара: {this.state.stockImportParts.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.stockImportParts.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Дата закупки: {this.state.stockImportParts.date}</label>
                        </div>
                        <div className='row'>
                            <label> Было закуплено: {this.state.stockImportParts.quantityBought}</label>
                        </div>
                        <div className='row'>
                            <label> В наличии: {this.state.stockImportParts.quantityCurrent}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость закупки: {this.state.stockImportParts.priceResult}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за расч. единицу товара: {this.state.stockImportParts.pricePU}</label>
                        </div>
                        <button className='btn btn-danger' onClick={() => this.props.navigate('/stock_import_parts')}
                            style={{ marginTop: "10px", marginLeft: auto, marginRight: auto, display: 'block' }}> <FiArrowLeft /> </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(InfoStockImportPartsComponent);