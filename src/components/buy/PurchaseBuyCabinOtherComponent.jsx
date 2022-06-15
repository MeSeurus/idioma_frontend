import React, { Component } from 'react';
import { withParams } from '../../hocs';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi'
import BuyCabinOtherService from '../../service/buy_services/BuyCabinOtherService';
import StockCabinOtherService from '../../service/stock_services/StockCabinOtherService';

class PurchaseBuyCabinOtherComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            date: '',
            comment: '',
            quantityBought: '',
            quantityCurrent: '',
            buyCabinOther: {},
            stockCabinOther: {}
        }

        this.changeStockCabinOtherCommentHandler = this.changeStockCabinOtherCommentHandler.bind(this)
        this.changeStockCabinOtherDateHandler = this.changeStockCabinOtherDateHandler.bind(this)
        this.changeStockCabinOtherQuantityBoughtHandler = this.changeStockCabinOtherQuantityBoughtHandler.bind(this)
        this.purchaseCabinOther = this.purchaseCabinOther.bind(this)

    }

    componentDidMount() {
        BuyCabinOtherService.getBuyCabinOtherById(this.state.id).then(res => {
            this.setState({ buyCabinOther: res.data });
        })
    }

    getDate() {
        var today = new Date();
        return String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    }

    changeStockCabinOtherCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeStockCabinOtherDateHandler = (event) => {
        this.setState({ date: event.target.value })
    }

    changeStockCabinOtherQuantityBoughtHandler = (event) => {
        this.setState({ quantityBought: event.target.value })
    }

    purchaseCabinOther = (e) => {
        e.preventDefault();
        let stockCabinOther = {
            recipeId: this.state.id,
            name: this.state.buyCabinOther.name,
            comment: this.state.comment,
            date: this.state.date,
            quantityCurrent: this.state.quantityBought,
            quantityBought: this.state.quantityBought,
            pricePU: this.state.buyCabinOther.price,
            priceResult: this.state.buyCabinOther.price * this.state.quantityBought,
        };

        StockCabinOtherService.createStockCabinOther(stockCabinOther);
        this.props.navigate('/stock_cabin_other', { replace: true });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h2 className='text-center-form'> Страница закупки </h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label> Наименование товара: {this.state.buyCabinOther.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.buyCabinOther.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Цена: {this.state.buyCabinOther.price}</label>
                        </div>
                        <form>
                            <div className='form-group'>
                                <label> Количество </label>
                                <input placeholder='Количество единиц товара' name='name' className='form-control'
                                    value={this.state.quantityBought} onChange={this.changeStockCabinOtherQuantityBoughtHandler} />
                            </div>
                            <div className='form-group'>
                                <label> Дата оформления </label>
                                <input placeholder={this.getDate()} name='comment' className='form-control'
                                    value={this.state.date} onChange={this.changeStockCabinOtherDateHandler} />
                            </div>
                            <div className='form-group-bottom'>
                                <label> Комментарий </label>
                                <input placeholder={'Оставить комментарий к поставке'} name='comment' className='form-control'
                                    value={this.state.comment} onChange={this.changeStockCabinOtherCommentHandler} />
                            </div>
                            <button className='btn btn-success' onClick={this.purchaseCabinOther}> <FiCheckSquare /> </button>
                            <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_cabin_other')} style={{ marginLeft: "10px" }}> <FiXSquare /> </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(PurchaseBuyCabinOtherComponent);