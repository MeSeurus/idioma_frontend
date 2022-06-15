import React, { Component } from 'react';
import { withParams } from '../../hocs';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi'
import BuyMetalSaezService from '../../service/buy_services/BuyMetalSaezService';
import StockMetalSaezService from '../../service/stock_services/StockMetalSaezService';

class PurchaseBuyMetalSaezComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            date: '',
            comment: '',
            quantityBought: '',
            quantityCurrent: '',
            coef: '',
            buyMetalSaez: {},
            stockMetalSaez: {}
        }

        this.changeStockMetalSaezCommentHandler = this.changeStockMetalSaezCommentHandler.bind(this)
        this.changeStockMetalSaezDateHandler = this.changeStockMetalSaezDateHandler.bind(this)
        this.changeStockMetalSaezQuantityBoughtHandler = this.changeStockMetalSaezQuantityBoughtHandler.bind(this)
        this.purchaseMetalSaez = this.purchaseMetalSaez.bind(this)

    }

    componentDidMount() {
        BuyMetalSaezService.getBuyMetalSaezById(this.state.id).then(res => {
            this.setState({ buyMetalSaez: res.data });
        })
    }

    getDate() {
        var today = new Date();
        return String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    }

    changeStockMetalSaezCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeStockMetalSaezDateHandler = (event) => {
        this.setState({ date: event.target.value })
    }

    changeStockMetalSaezQuantityBoughtHandler = (event) => {
        this.setState({ quantityBought: event.target.value })
    }

    purchaseMetalSaez = (e) => {
        e.preventDefault();
        let stockMetalSaez = {
            recipeId: this.state.id,
            name: this.state.buyMetalSaez.name,
            comment: this.state.comment,
            date: this.state.date,
            coef: this.state.coef,
            quantityCurrent: this.state.quantityBought,
            quantityBought: this.state.quantityBought,
            pricePUEuro: this.state.buyMetalSaez.priceEuro,
            pricePURuble: this.state.buyMetalSaez.priceRuble,
            priceResult: this.state.buyMetalSaez.priceRuble * this.state.quantityBought,
        };

        StockMetalSaezService.createStockMetalSaez(stockMetalSaez);
        this.props.navigate('/stock_metal_saez', { replace: true });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h2 className='text-center-form'> Страница закупки </h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label> Наименование товара: {this.state.buyMetalSaez.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.buyMetalSaez.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за товар в Евро: {this.state.buyMetalSaez.priceEuro}</label>
                        </div>
                        <div className='row'>
                            <label> Коэффициент логистики: {this.state.buyMetalSaez.coef}</label>
                        </div>
                        <div className='row'>
                            <label> Итоговая цена в рублях: {this.state.buyMetalSaez.priceRuble}</label>
                        </div>
                        <form>
                            <div className='form-group'>
                                <label> Количество </label>
                                <input placeholder='Количество единиц товара' name='name' className='form-control'
                                    value={this.state.quantityBought} onChange={this.changeStockMetalSaezQuantityBoughtHandler} />
                            </div>
                            <div className='form-group'>
                                <label> Дата оформления </label>
                                <input placeholder={this.getDate()} name='comment' className='form-control'
                                    value={this.state.date} onChange={this.changeStockMetalSaezDateHandler} />
                            </div>
                            <div className='form-group-bottom'>
                                <label> Комментарий </label>
                                <input placeholder={'Оставить комментарий к поставке'} name='comment' className='form-control'
                                    value={this.state.comment} onChange={this.changeStockMetalSaezCommentHandler} />
                            </div>
                            <button className='btn btn-success' onClick={this.purchaseMetalSaez}> <FiCheckSquare /> </button>
                            <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_metal_saez')} style={{ marginLeft: "10px" }}> <FiXSquare /> </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(PurchaseBuyMetalSaezComponent);