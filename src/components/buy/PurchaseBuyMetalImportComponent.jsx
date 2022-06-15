import React, { Component } from 'react';
import { withParams } from '../../hocs';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi'
import BuyMetalImportService from '../../service/buy_services/BuyMetalImportService';
import StockMetalImportService from '../../service/stock_services/StockMetalImportService';

class PurchaseBuyMetalImportComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            date: '',
            comment: '',
            quantityCatBought: '',
            quantityManBought: '',
            quantityManCurrent: '',
            quantityCatCurrent: '',
            coef: '',
            buyMetalImport: {},
            stockMetalImport: {}
        }

        this.changeStockMetalImportCommentHandler = this.changeStockMetalImportCommentHandler.bind(this)
        this.changeStockMetalImportDateHandler = this.changeStockMetalImportDateHandler.bind(this)
        this.changeStockMetalImportQuantityCatBoughtHandler = this.changeStockMetalImportQuantityCatBoughtHandler.bind(this)
        this.purchaseMetalImport = this.purchaseMetalImport.bind(this)

    }

    componentDidMount() {
        BuyMetalImportService.getBuyMetalImportById(this.state.id).then(res => {
            this.setState({ buyMetalImport: res.data });
        })
    }

    getDate() {
        var today = new Date();
        return String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    }

    changeStockMetalImportCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeStockMetalImportDateHandler = (event) => {
        this.setState({ date: event.target.value })
    }

    changeStockMetalImportQuantityCatBoughtHandler = (event) => {
        this.setState({ quantityCatBought: event.target.value })
    }

    purchaseMetalImport = (e) => {
        e.preventDefault();
        let stockMetalImport = {
            recipeId: this.state.id,
            name: this.state.buyMetalImport.name,
            comment: this.state.comment,
            date: this.state.date,
            coef: this.state.buyMetalImport.coef,
            quantityCatCurrent: this.state.quantityCatBought,
            quantityManCurrent: this.state.quantityCatBought * this.state.buyMetalImport.coef,
            quantityCatBought: this.state.quantityCatBought,
            quantityManBought: this.state.quantityCatBought * this.state.buyMetalImport.coef,
            pricePUCat: this.state.buyMetalImport.priceRuble,
            pricePUMan: this.state.buyMetalImport.pricePURuble,
            priceEuro: this.state.buyMetalImport.priceEuro * this.state.quantityManBought,
            priceResult: this.state.buyMetalImport.pricePURuble * this.state.quantityCatBought,
        };

        StockMetalImportService.createStockMetalImport(stockMetalImport);
        this.props.navigate('/stock_metal_import', { replace: true });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h2 className='text-center-form'> Страница закупки </h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label> Наименование товара: {this.state.buyMetalImport.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.buyMetalImport.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Цена закупки в Евро: {this.state.buyMetalImport.priceEuro}</label>
                        </div>
                        <div className='row'>
                            <label> Цена закупки в Рублях: {this.state.buyMetalImport.priceRuble}</label>
                        </div>
                        <div className='row'>
                            <label> Коэффициент материала: {this.state.buyMetalImport.coef}</label>
                        </div>
                        <div className='row'>
                            <label> Цена в расчётных единицах: {this.state.buyMetalImport.pricePURuble}</label>
                        </div>
                        <form>
                            <div className='form-group'>
                                <label> Количество </label>
                                <input placeholder='Количество единиц товара' name='name' className='form-control'
                                    value={this.state.quantityCatBought} onChange={this.changeStockMetalImportQuantityCatBoughtHandler} />
                            </div>
                            <div className='form-group'>
                                <label> Дата оформления </label>
                                <input placeholder={this.getDate()} name='comment' className='form-control'
                                    value={this.state.date} onChange={this.changeStockMetalImportDateHandler} />
                            </div>
                            <div className='form-group-bottom'>
                                <label> Комментарий </label>
                                <input placeholder={'Оставить комментарий к поставке'} name='comment' className='form-control'
                                    value={this.state.comment} onChange={this.changeStockMetalImportCommentHandler} />
                            </div>
                            <button className='btn btn-success' onClick={this.purchaseMetalImport}> <FiCheckSquare /> </button>
                            <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_metal_import')} style={{ marginLeft: "10px" }}> <FiXSquare /> </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(PurchaseBuyMetalImportComponent);