import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withParams } from '../../hocs';
import BuyConsumablesService from '../../service/buy_services/BuyConsumablesService';

class CreateBuyConsumablesComponent extends Component {

    constructor(props) {
        super(props)

        let { id } = props.params;

        this.state = {
            id: id,
            name: '',
            comment: '',
            priceGoods: '',
            priceWork: '',
            priceResult: ''
        }

        this.changeConsumablesCommentHandler = this.changeConsumablesCommentHandler.bind(this)
        this.changeConsumablesNameHandler = this.changeConsumablesNameHandler.bind(this)
        this.changeConsumablesPriceGoodsHandler = this.changeConsumablesPriceGoodsHandler.bind(this)
        this.changeConsumablesPriceWorkHandler = this.changeConsumablesPriceWorkHandler.bind(this)
        this.changeConsumablesPriceResultHandler = this.changeConsumablesPriceResultHandler.bind(this)
        this.saveOrUpdateBuyConsumables = this.saveOrUpdateBuyConsumables.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "_add") {
            return
        } else {
            BuyConsumablesService.getBuyConsumablesById(this.state.id).then((res) => {
                let buyConsumables = res.data;
                this.setState({
                    name: buyConsumables.name,
                    comment: buyConsumables.comment,
                    priceGoods: buyConsumables.priceGoods,
                    priceWork: buyConsumables.priceWork,
                    priceResult: buyConsumables.priceResult
                });
            });
        }
    }

    saveOrUpdateBuyConsumables = (e) => {
        e.preventDefault();
        let buyConsumables = {
            name: this.state.name,
            comment: this.state.comment,
            priceGoods: this.state.priceGoods,
            priceWork: this.state.priceWork,
            priceResult: this.state.priceResult
        };
        console.log('Добавлена запись в закупки (Метизы) => ' + JSON.stringify(buyConsumables));

        if (this.state.id === "_add") {
            BuyConsumablesService.createBuyConsumables(buyConsumables);
            this.props.navigate('/buy_consumables', { replace: true });
        } else {
            BuyConsumablesService.updateBuyConsumables(buyConsumables, this.state.id);
            this.props.navigate('/buy_consumables', { replace: true });
        }
    }

    changeConsumablesNameHandler = (event) => {
        this.setState({ name: event.target.value })
    }

    changeConsumablesCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeConsumablesPriceGoodsHandler = (event) => {
        this.setState({ priceGoods: event.target.value })
    }

    changeConsumablesPriceWorkHandler = (event) => {
        this.setState({ priceWork: event.target.value })
    }

    changeConsumablesPriceResultHandler = (event) => {
        this.setState({ priceResult: event.target.value })
    }

    cancel() {
        this.props.history.push('/buy_consumables');
    }

    getTitle() {
        if (this.state.id === "_add") {
            return <h3 className='text-center-form menu-item'> Добавить позицию в закупки (Расходные материалы) </h3>
        } else {
            return <h3 className='text-center-form menu-item'> Изменить позицию в закупке (Расходные материалы) </h3>
        }
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {
                                this.getTitle()
                            }
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label> Наименование </label>
                                        <input placeholder='Наименование позиции' name='name' className='form-control'
                                            value={this.state.name} onChange={this.changeConsumablesNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Комментарий </label>
                                        <input placeholder='Заметки, комментарии' name='comment' className='form-control'
                                            value={this.state.comment} onChange={this.changeConsumablesCommentHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Цена за товар </label>
                                        <input placeholder='Цена за расчётную единицу товара' name='priceGoods' className='form-control'
                                            value={this.state.priceGoods} onChange={this.changeConsumablesPriceGoodsHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Стоимость работы </label>
                                        <input placeholder='Цена за работы на изготовление единицы товара' name='priceWork' className='form-control'
                                            value={this.state.priceWork} onChange={this.changeConsumablesPriceWorkHandler} />
                                    </div>
                                    <div className='form-group-bottom'>
                                        <label> Итоговая цена </label>
                                        <input placeholder='Результирующая цена за готовую единицу товара' name='priceResult' className='form-control'
                                            value={this.state.priceResult} onChange={this.changeConsumablesPriceResultHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateBuyConsumables}> Сохранить </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_consumables')} style={{ marginLeft: "10px" }}> Отмена </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(CreateBuyConsumablesComponent);