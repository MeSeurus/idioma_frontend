import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withParams } from '../../hocs';
import BuyHardwareService from '../../service/buy_services/BuyHardwareService';

class CreateBuyHardwareComponent extends Component {

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

        this.changeHardwareCommentHandler = this.changeHardwareCommentHandler.bind(this)
        this.changeHardwareNameHandler = this.changeHardwareNameHandler.bind(this)
        this.changeHardwarePriceGoodsHandler = this.changeHardwarePriceGoodsHandler.bind(this)
        this.changeHardwarePriceWorkHandler = this.changeHardwarePriceWorkHandler.bind(this)
        this.changeHardwarePriceResultHandler = this.changeHardwarePriceResultHandler.bind(this)
        this.saveOrUpdateBuyHardware = this.saveOrUpdateBuyHardware.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "_add") {
            return
        } else {
            BuyHardwareService.getBuyHardwareById(this.state.id).then((res) => {
                let buyHardware = res.data;
                this.setState({
                    name: buyHardware.name,
                    comment: buyHardware.comment,
                    priceGoods: buyHardware.priceGoods,
                    priceWork: buyHardware.priceWork,
                    priceResult: buyHardware.priceResult
                });
            });
        }
    }

    saveOrUpdateBuyHardware = (e) => {
        e.preventDefault();
        let buyHardware = {
            name: this.state.name,
            comment: this.state.comment,
            priceGoods: this.state.priceGoods,
            priceWork: this.state.priceWork,
            priceResult: this.state.priceResult
        };
        console.log('Добавлена запись в закупки (Метизы) => ' + JSON.stringify(buyHardware));

        if (this.state.id === "_add") {
            BuyHardwareService.createBuyHardware(buyHardware);
            this.props.navigate('/buy_hardware', { replace: true });
        } else {
            BuyHardwareService.updateBuyHardware(buyHardware, this.state.id);
            this.props.navigate('/buy_hardware', { replace: true });
        }
    }

    changeHardwareNameHandler = (event) => {
        this.setState({ name: event.target.value })
    }

    changeHardwareCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeHardwarePriceGoodsHandler = (event) => {
        this.setState({ priceGoods: event.target.value })
    }

    changeHardwarePriceWorkHandler = (event) => {
        this.setState({ priceWork: event.target.value })
    }

    changeHardwarePriceResultHandler = (event) => {
        this.setState({ priceResult: event.target.value })
    }

    cancel() {
        this.props.history.push('/buy_hardware');
    }

    getTitle() {
        if (this.state.id === "_add") {
            return <h3 className='text-center-form menu-item'> Добавить позицию в закупки (Метизы) </h3>
        } else {
            return <h3 className='text-center-form menu-item'> Изменить позицию в закупке (Метизы) </h3>
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
                                            value={this.state.name} onChange={this.changeHardwareNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Комментарий </label>
                                        <input placeholder='Заметки, комментарии' name='comment' className='form-control'
                                            value={this.state.comment} onChange={this.changeHardwareCommentHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Цена за товар </label>
                                        <input placeholder='Цена за расчётную единицу товара' name='priceGoods' className='form-control'
                                            value={this.state.priceGoods} onChange={this.changeHardwarePriceGoodsHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Стоимость работы </label>
                                        <input placeholder='Цена за работы на изготовление единицы товара' name='priceWork' className='form-control'
                                            value={this.state.priceWork} onChange={this.changeHardwarePriceWorkHandler} />
                                    </div>
                                    <div className='form-group-bottom'>
                                        <label> Итоговая цена </label>
                                        <input placeholder='Результирующая цена за готовую единицу товара' name='priceResult' className='form-control'
                                            value={this.state.priceResult} onChange={this.changeHardwarePriceResultHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateBuyHardware}> Сохранить </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_hardware')} style={{ marginLeft: "10px" }}> Отмена </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(CreateBuyHardwareComponent);