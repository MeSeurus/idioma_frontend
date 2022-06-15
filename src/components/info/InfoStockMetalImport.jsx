import React, { Component } from 'react';
import { withParams } from '../../hocs';
import StockMetalImportService from '../../service/stock_services/StockMetalImportService';
import { FiArrowLeft } from 'react-icons/fi'
import { auto } from '@popperjs/core';

class InfoStockMetalImportComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            stockMetalImport: {}
        }

    }

    componentDidMount() {
        StockMetalImportService.getStockMetalImportById(this.state.id).then(res => {
            this.setState({ stockMetalImport: res.data });
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
                            <label> Наименование товара: {this.state.stockMetalImport.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.stockMetalImport.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Дата закупки: {this.state.stockMetalImport.date}</label>
                        </div>
                        <div className='row'>
                            <label> Коэффициент материала: {this.state.stockMetalImport.coef}</label>
                        </div>
                        <div className='row'>
                            <label> Было закуплено (расч. единиц): {this.state.stockMetalImport.quantityManBought}</label>
                        </div>
                        <div className='row'>
                            <label> В наличии (расч. единиц): {this.state.stockMetalImport.quantityManCurrent}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за расч. единицу товара: {this.state.stockMetalImport.pricePUMan}</label>
                        </div>
                        <div className='row'>
                            <label> Стоимость закупки: {this.state.stockMetalImport.priceResult}</label>
                        </div>
                        <button className='btn btn-danger' onClick={() => this.props.navigate('/stock_metal_import')}
                            style={{ marginTop: "10px", marginLeft: auto, marginRight: auto, display: 'block' }}> <FiArrowLeft /> </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(InfoStockMetalImportComponent);