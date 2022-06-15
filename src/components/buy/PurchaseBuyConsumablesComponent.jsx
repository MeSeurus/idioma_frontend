import React, { Component } from 'react';
import { withParams } from '../../hocs';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi'
import BuyConsumablesService from '../../service/buy_services/BuyConsumablesService';
import StockConsumablesService from '../../service/stock_services/StockConsumablesService';

class PurchaseBuyConsumablesComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            date: '',
            comment: '',
            quantityBought: '',
            quantityCurrent: '',
            buyConsumables: {},
            stockConsumables: {}
        }

        this.changeStockConsumablesCommentHandler = this.changeStockConsumablesCommentHandler.bind(this)
        this.changeStockConsumablesDateHandler = this.changeStockConsumablesDateHandler.bind(this)
        this.changeStockConsumablesQuantityBoughtHandler = this.changeStockConsumablesQuantityBoughtHandler.bind(this)
        this.purchaseConsumables = this.purchaseConsumables.bind(this)

    }

    componentDidMount() {
        BuyConsumablesService.getBuyConsumablesById(this.state.id).then(res => {
            this.setState({ buyConsumables: res.data });
        })
    }

    getDate() {
        var today = new Date();
        return String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    }

    changeStockConsumablesCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeStockConsumablesDateHandler = (event) => {
        this.setState({ date: event.target.value })
    }

    changeStockConsumablesQuantityBoughtHandler = (event) => {
        this.setState({ quantityBought: event.target.value })
    }

    purchaseConsumables = (e) => {
        e.preventDefault();
        let stockConsumables = {
            recipeId: this.state.id,
            name: this.state.buyConsumables.name,
            comment: this.state.comment,
            date: this.state.date,
            quantityCurrent: this.state.quantityBought,
            quantityBought: this.state.quantityBought,
            priceGoods: this.state.buyConsumables.priceGoods,
            priceWork: this.state.buyConsumables.priceWork,
            pricePU: this.state.buyConsumables.priceResult,
            priceResult: this.state.buyConsumables.priceResult * this.state.quantityBought,
        };

        StockConsumablesService.createStockConsumables(stockConsumables);
        this.props.navigate('/stock_consumables', { replace: true });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h2 className='text-center-form'> Страница закупки </h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label> Наименование товара: {this.state.buyConsumables.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.buyConsumables.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за товар: {this.state.buyConsumables.priceGoods}</label>
                        </div>
                        <div className='row'>
                            <label> Стоиость работы: {this.state.buyConsumables.priceWork}</label>
                        </div>
                        <div className='row'>
                            <label> Итоговая цена: {this.state.buyConsumables.priceResult}</label>
                        </div>
                        <form>
                            <div className='form-group'>
                                <label> Количество </label>
                                <input placeholder='Количество единиц товара' name='name' className='form-control'
                                    value={this.state.quantityBought} onChange={this.changeStockConsumablesQuantityBoughtHandler} />
                            </div>
                            <div className='form-group'>
                                <label> Дата оформления </label>
                                <input placeholder={this.getDate()} name='comment' className='form-control'
                                    value={this.state.date} onChange={this.changeStockConsumablesDateHandler} />
                            </div>
                            <div className='form-group-bottom'>
                                <label> Комментарий </label>
                                <input placeholder={'Оставить комментарий к поставке'} name='comment' className='form-control'
                                    value={this.state.comment} onChange={this.changeStockConsumablesCommentHandler} />
                            </div>
                            <button className='btn btn-success' onClick={this.purchaseConsumables}> <FiCheckSquare /> </button>
                            <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_consumables')} style={{ marginLeft: "10px" }}> <FiXSquare /> </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(PurchaseBuyConsumablesComponent);