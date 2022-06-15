import React, { Component } from 'react';
import { withParams } from '../../hocs';
import { FiCheckSquare, FiXSquare } from 'react-icons/fi';
import BuyImportPartsService from '../../service/buy_services/BuyImportPartsService';
import StockImportPartsService from '../../service/stock_services/StockImportPartsService';

class PurchaseBuyImportPartsComponent extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            date: '',
            comment: '',
            quantityBought: '',
            quantityCurrent: '',
            buyImportParts: {},
            stockImportParts: {}
        }

        this.changeStockImportPartsCommentHandler = this.changeStockImportPartsCommentHandler.bind(this)
        this.changeStockImportPartsDateHandler = this.changeStockImportPartsDateHandler.bind(this)
        this.changeStockImportPartsQuantityBoughtHandler = this.changeStockImportPartsQuantityBoughtHandler.bind(this)
        this.purchaseImportParts = this.purchaseImportParts.bind(this)

    }

    componentDidMount() {
        BuyImportPartsService.getBuyImportPartsById(this.state.id).then(res => {
            this.setState({ buyImportParts: res.data });
        })
    }

    getDate() {
        var today = new Date();
        return String(today.getFullYear()) + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    }

    changeStockImportPartsCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeStockImportPartsDateHandler = (event) => {
        this.setState({ date: event.target.value })
    }

    changeStockImportPartsQuantityBoughtHandler = (event) => {
        this.setState({ quantityBought: event.target.value })
    }

    purchaseImportParts = (e) => {
        e.preventDefault();
        let stockImportParts = {
            recipeId: this.state.id,
            name: this.state.buyImportParts.name,
            comment: this.state.comment,
            date: this.state.date,
            quantityCurrent: this.state.quantityBought,
            quantityBought: this.state.quantityBought,
            pricePU: this.state.buyImportParts.price,
            priceResult: this.state.buyImportParts.price * this.state.quantityBought,
        };

        StockImportPartsService.createStockImportParts(stockImportParts);
        this.props.navigate('/stock_import_parts', { replace: true });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h2 className='text-center-form'> Страница закупки </h2>
                    <div className='card-body'>
                        <div className='row'>
                            <label> Наименование товара: {this.state.buyImportParts.name} </label>
                        </div>
                        <div className='row'>
                            <label> Комментарий к товару: {this.state.buyImportParts.comment}</label>
                        </div>
                        <div className='row'>
                            <label> Цена: {this.state.buyImportParts.price}</label>
                        </div>
                        <form>
                            <div className='form-group'>
                                <label> Количество </label>
                                <input placeholder='Количество единиц товара' name='name' className='form-control'
                                    value={this.state.quantityBought} onChange={this.changeStockImportPartsQuantityBoughtHandler} />
                            </div>
                            <div className='form-group'>
                                <label> Дата оформления </label>
                                <input placeholder={this.getDate()} name='comment' className='form-control'
                                    value={this.state.date} onChange={this.changeStockImportPartsDateHandler} />
                            </div>
                            <div className='form-group-bottom'>
                                <label> Комментарий </label>
                                <input placeholder={'Оставить комментарий к поставке'} name='comment' className='form-control'
                                    value={this.state.comment} onChange={this.changeStockImportPartsCommentHandler} />
                            </div>
                            <button className='btn btn-success' onClick={this.purchaseImportParts}> <FiCheckSquare /> </button>
                            <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_import_parts')} style={{ marginLeft: "10px" }}> <FiXSquare /> </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(PurchaseBuyImportPartsComponent);