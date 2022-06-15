import React, { Component } from 'react';
import { withParams } from '../../hocs';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi'
import BuyPlasmaService from '../../service/buy_services/BuyPlasmaService';
import StockPlasmaService from '../../service/stock_services/StockPlasmaService';


class PurchaseBuyPlasmaComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            date: '',
            comment: '',
            quantityBought: '',
            quantityCurrent: '',
            buyPlasma: {},
            stockPlasma: {}
        }

        this.changeStockPlasmaCommentHandler = this.changeStockPlasmaCommentHandler.bind(this)
        this.changeStockPlasmaDateHandler = this.changeStockPlasmaDateHandler.bind(this)
        this.changeStockPlasmaQuantityBoughtHandler = this.changeStockPlasmaQuantityBoughtHandler.bind(this)
        this.purchasePlasma = this.purchasePlasma.bind(this)


    }

    componentDidMount() {
        BuyPlasmaService.getBuyPlasmaById(this.state.id).then(res => {
            this.setState({ buyPlasma: res.data });
        })
    }

    getDate() {
        var today = new Date();
        return String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    }

    changeStockPlasmaCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeStockPlasmaDateHandler = (event) => {
        this.setState({ date: event.target.value })
    }

    changeStockPlasmaQuantityBoughtHandler = (event) => {
        this.setState({ quantityBought: event.target.value })
    }

    purchasePlasma = (e) => {
        e.preventDefault();
        let stockPlasma = {
            recipeId: this.state.id,
            name: this.state.buyPlasma.name,
            comment: this.state.comment,
            date: this.state.date,
            quantityCurrent: this.state.quantityBought,
            quantityBought: this.state.quantityBought,
            priceGoods: this.state.buyPlasma.priceGoods,
            priceWork: this.state.buyPlasma.priceWork,
            pricePU: this.state.buyPlasma.priceResult,
            priceResult: this.state.buyPlasma.priceResult * this.state.quantityBought,
        };

        StockPlasmaService.createStockPlasma(stockPlasma);
        this.props.navigate('/stock_plasma', { replace: true });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h2 className='text-center-form'> Страница закупки </h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label> Наименование товара: {this.state.buyPlasma.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.buyPlasma.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Цена за товар: {this.state.buyPlasma.priceGoods}</label>
                        </div>
                        <div className='row'>
                            <label> Стоиость работы: {this.state.buyPlasma.priceWork}</label>
                        </div>
                        <div className='row'>
                            <label> Итоговая цена: {this.state.buyPlasma.priceResult}</label>
                        </div>
                        <form>
                            <div className='form-group'>
                                <label> Количество </label>
                                <input placeholder='Количество единиц товара' name='name' className='form-control'
                                    value={this.state.quantityBought} onChange={this.changeStockPlasmaQuantityBoughtHandler} />
                            </div>
                            <div className='form-group'>
                                <label> Дата оформления </label>
                                <input placeholder={this.getDate()} name='comment' className='form-control'
                                    value={this.state.date} onChange={this.changeStockPlasmaDateHandler} />
                            </div>
                            <div className='form-group-bottom'>
                                <label> Комментарий </label>
                                <input placeholder={'Оставить комментарий к поставке'} name='comment' className='form-control'
                                    value={this.state.comment} onChange={this.changeStockPlasmaCommentHandler} />
                            </div>
                            <button className='btn btn-success' onClick={this.purchasePlasma}> <FiCheckSquare /> </button>
                            <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_plasma')} style={{ marginLeft: "10px" }}> <FiXSquare /> </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(PurchaseBuyPlasmaComponent);