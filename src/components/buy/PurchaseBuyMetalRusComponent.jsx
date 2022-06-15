import React, { Component } from 'react';
import { withParams } from '../../hocs';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi'
import BuyMetalRusService from '../../service/buy_services/BuyMetalRusService';
import StockMetalRusService from '../../service/stock_services/StockMetalRusService';

class PurchaseBuyMetalRusComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            date: '',
            comment: '',
            coef: '',
            quantityCatBought: '',
            quantityManBought: '',
            quantityManCurrent: '',
            quantityCatCurrent: '',
            buyMetalRus: {},
            stockMetalRus: {}
        }


        this.changeStockMetalRusCommentHandler = this.changeStockMetalRusCommentHandler.bind(this)
        this.changeStockMetalRusDateHandler = this.changeStockMetalRusDateHandler.bind(this)
        this.changeStockMetalRusQuantityCatBoughtHandler = this.changeStockMetalRusQuantityCatBoughtHandler.bind(this)
        this.purchaseMetalRus = this.purchaseMetalRus.bind(this)

    }

    componentDidMount() {
        BuyMetalRusService.getBuyMetalRusById(this.state.id).then(res => {
            this.setState({ buyMetalRus: res.data });
        })
    }

    getDate() {
        var today = new Date();
        return String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    }

    changeStockMetalRusCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeStockMetalRusDateHandler = (event) => {
        this.setState({ date: event.target.value })
    }

    changeStockMetalRusQuantityCatBoughtHandler = (event) => {
        this.setState({ quantityCatBought: event.target.value })
    }

    purchaseMetalRus = (e) => {
        e.preventDefault();
        let stockMetalRus = {
            recipeId: this.state.id,
            name: this.state.buyMetalRus.name,
            comment: this.state.comment,
            date: this.state.date,
            coef: this.state.buyMetalRus.coef,
            quantityCatCurrent: this.state.quantityCatBought,
            quantityCatBought: this.state.quantityCatBought,
            pricePUCat: this.state.buyMetalRus.priceRuble,
            pricePUMan: this.state.buyMetalRus.pricePURuble,
            priceResult: this.state.buyMetalRus.priceRuble * this.state.quantityCatBought,
            quantityManCurrent: (this.state.buyMetalRus.priceRuble * this.state.quantityCatBought / this.state.buyMetalRus.pricePURuble).toFixed(2),
            quantityManBought: (this.state.buyMetalRus.priceRuble * this.state.quantityCatBought / this.state.buyMetalRus.pricePURuble).toFixed(2),
        };

        StockMetalRusService.createStockMetalRus(stockMetalRus);
        this.props.navigate('/stock_metal_rus', { replace: true });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h2 className='text-center-form'> Страница закупки </h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label> Наименование товара: {this.state.buyMetalRus.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.buyMetalRus.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Цена закупки: {this.state.buyMetalRus.priceRuble}</label>
                        </div>
                        <div className='row'>
                            <label> Коэффициент материала: {this.state.buyMetalRus.coef}</label>
                        </div>
                        <div className='row'>
                            <label> Цена в расчётных единицах: {this.state.buyMetalRus.pricePURuble}</label>
                        </div>
                        <form>
                            <div className='form-group'>
                                <label> Количество </label>
                                <input placeholder='Количество единиц товара' name='name' className='form-control'
                                    value={this.state.quantityCatBought} onChange={this.changeStockMetalRusQuantityCatBoughtHandler} />
                            </div>
                            <div className='form-group'>
                                <label> Дата оформления </label>
                                <input placeholder={this.getDate()} name='comment' className='form-control'
                                    value={this.state.date} onChange={this.changeStockMetalRusDateHandler} />
                            </div>
                            <div className='form-group-bottom'>
                                <label> Комментарий </label>
                                <input placeholder={'Оставить комментарий к поставке'} name='comment' className='form-control'
                                    value={this.state.comment} onChange={this.changeStockMetalRusCommentHandler} />
                            </div>
                            <button className='btn btn-success' onClick={this.purchaseMetalRus}> <FiCheckSquare /> </button>
                            <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_metal_rus')} style={{ marginLeft: "10px" }}> <FiXSquare /> </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(PurchaseBuyMetalRusComponent);