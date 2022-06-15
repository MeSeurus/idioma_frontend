import React, { Component } from 'react';
import { withParams } from '../../hocs';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi'
import BuyElectricsService from '../../service/buy_services/BuyElectricsService';
import StockElectricsService from '../../service/stock_services/StockElectricsService';

class PurchaseBuyElectricsComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            date: '',
            comment: '',
            quantityBought: '',
            quantityCurrent: '',
            buyElectrics: {},
            stockElectrics: {}
        }

        this.changeStockElectricsCommentHandler = this.changeStockElectricsCommentHandler.bind(this)
        this.changeStockElectricsDateHandler = this.changeStockElectricsDateHandler.bind(this)
        this.changeStockElectricsQuantityBoughtHandler = this.changeStockElectricsQuantityBoughtHandler.bind(this)
        this.purchaseElectrics = this.purchaseElectrics.bind(this)


    }

    componentDidMount() {
        BuyElectricsService.getBuyElectricsById(this.state.id).then(res => {
            this.setState({ buyElectrics: res.data });
        })
    }

    getDate() {
        var today = new Date();
        return String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    }

    changeStockElectricsCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeStockElectricsDateHandler = (event) => {
        this.setState({ date: event.target.value })
    }

    changeStockElectricsQuantityBoughtHandler = (event) => {
        this.setState({ quantityBought: event.target.value })
    }

    purchaseElectrics = (e) => {
        e.preventDefault();
        let stockElectrics = {
            recipeId: this.state.id,
            name: this.state.buyElectrics.name,
            comment: this.state.comment,
            date: this.state.date,
            quantityCurrent: this.state.quantityBought,
            quantityBought: this.state.quantityBought,
            pricePU: this.state.buyElectrics.price,
            priceResult: this.state.buyElectrics.price * this.state.quantityBought,
        };

        StockElectricsService.createStockElectrics(stockElectrics);
        this.props.navigate('/stock_electrics', { replace: true });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h2 className='text-center-form'> Страница закупки </h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label> Наименование товара: {this.state.buyElectrics.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.buyElectrics.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Цена: {this.state.buyElectrics.price}</label>
                        </div>
                        <form>
                            <div className='form-group'>
                                <label> Количество </label>
                                <input placeholder='Количество единиц товара' name='name' className='form-control'
                                    value={this.state.quantityBought} onChange={this.changeStockElectricsQuantityBoughtHandler} />
                            </div>
                            <div className='form-group'>
                                <label> Дата оформления </label>
                                <input placeholder={this.getDate()} name='comment' className='form-control'
                                    value={this.state.date} onChange={this.changeStockElectricsDateHandler} />
                            </div>
                            <div className='form-group-bottom'>
                                <label> Комментарий </label>
                                <input placeholder={'Оставить комментарий к поставке'} name='comment' className='form-control'
                                    value={this.state.comment} onChange={this.changeStockElectricsCommentHandler} />
                            </div>
                            <button className='btn btn-success' onClick={this.purchaseElectrics}> <FiCheckSquare /> </button>
                            <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_electrics')} style={{ marginLeft: "10px" }}> <FiXSquare /> </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(PurchaseBuyElectricsComponent);