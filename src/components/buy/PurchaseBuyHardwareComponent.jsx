import React, { Component } from 'react';
import { withParams } from '../../hocs';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi'
import BuyHardwareService from '../../service/buy_services/BuyHardwareService';
import StockHardwareService from '../../service/stock_services/StockHardwareService';

class PurchaseBuyHardwareComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            date: '',
            comment: '',
            quantityBought: '',
            quantityCurrent: '',
            buyHardware: {},
            stockHardware: {}
        }

        this.changeStockHardwareCommentHandler = this.changeStockHardwareCommentHandler.bind(this)
        this.changeStockHardwareDateHandler = this.changeStockHardwareDateHandler.bind(this)
        this.changeStockHardwareQuantityBoughtHandler = this.changeStockHardwareQuantityBoughtHandler.bind(this)
        this.purchaseHardware = this.purchaseHardware.bind(this)

    }

    componentDidMount() {
        BuyHardwareService.getBuyHardwareById(this.state.id).then(res => {
            this.setState({ buyHardware: res.data });
        })
    }

    getDate() {
        var today = new Date();
        return String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    }

    changeStockHardwareCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeStockHardwareDateHandler = (event) => {
        this.setState({ date: event.target.value })
    }

    changeStockHardwareQuantityBoughtHandler = (event) => {
        this.setState({ quantityBought: event.target.value })
    }

    purchaseHardware = (e) => {
        e.preventDefault();
        let stockHardware = {
            recipeId: this.state.id,
            name: this.state.buyHardware.name,
            comment: this.state.comment,
            date: this.state.date,
            quantityCurrent: this.state.quantityBought,
            quantityBought: this.state.quantityBought,
            priceGoods: this.state.buyHardware.priceGoods,
            priceWork: this.state.buyHardware.priceWork,
            pricePU: this.state.buyHardware.priceResult,
            priceResult: this.state.buyHardware.priceResult * this.state.quantityBought,
        };

        StockHardwareService.createStockHardware(stockHardware);
        this.props.navigate('/stock_hardware', { replace: true });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h2 className='text-center-form'> Страница закупки </h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label> Наименование товара: {this.state.buyHardware.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.buyHardware.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за товар: {this.state.buyHardware.priceGoods}</label>
                        </div>
                        <div className='row'>
                            <label> Стоиость работы: {this.state.buyHardware.priceWork}</label>
                        </div>
                        <div className='row'>
                            <label> Итоговая цена: {this.state.buyHardware.priceResult}</label>
                        </div>
                        <form>
                            <div className='form-group'>
                                <label> Количество </label>
                                <input placeholder='Количество единиц товара' name='name' className='form-control'
                                    value={this.state.quantityBought} onChange={this.changeStockHardwareQuantityBoughtHandler} />
                            </div>
                            <div className='form-group'>
                                <label> Дата оформления </label>
                                <input placeholder={this.getDate()} name='comment' className='form-control'
                                    value={this.state.date} onChange={this.changeStockHardwareDateHandler} />
                            </div>
                            <div className='form-group-bottom'>
                                <label> Комментарий </label>
                                <input placeholder={'Оставить комментарий к поставке'} name='comment' className='form-control'
                                    value={this.state.comment} onChange={this.changeStockHardwareCommentHandler} />
                            </div>
                            <button className='btn btn-success' onClick={this.purchaseHardware}> <FiCheckSquare /> </button>
                            <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_hardware')} style={{ marginLeft: "10px" }}> <FiXSquare /> </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(PurchaseBuyHardwareComponent);