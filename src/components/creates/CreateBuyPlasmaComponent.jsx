import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withParams } from '../../hocs';
import BuyPlasmaService from '../../service/buy_services/BuyPlasmaService';

class CreateBuyPlasmaComponent extends Component {

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

        this.changePlasmaCommentHandler = this.changePlasmaCommentHandler.bind(this)
        this.changePlasmaNameHandler = this.changePlasmaNameHandler.bind(this)
        this.changePlasmaPriceGoodsHandler = this.changePlasmaPriceGoodsHandler.bind(this)
        this.changePlasmaPriceWorkHandler = this.changePlasmaPriceWorkHandler.bind(this)
        this.changePlasmaPriceResultHandler = this.changePlasmaPriceResultHandler.bind(this)
        this.saveOrUpdateBuyPlasma = this.saveOrUpdateBuyPlasma.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "_add") {
            return
        } else {
            BuyPlasmaService.getBuyPlasmaById(this.state.id).then((res) => {
                let buyPlasma = res.data;
                this.setState({
                    name: buyPlasma.name,
                    comment: buyPlasma.comment,
                    priceGoods: buyPlasma.priceGoods,
                    priceWork: buyPlasma.priceWork,
                    priceResult: buyPlasma.priceResult
                });
            });
        }
    }

    saveOrUpdateBuyPlasma = (e) => {
        e.preventDefault();
        let buyPlasma = {
            name: this.state.name,
            comment: this.state.comment,
            priceGoods: this.state.priceGoods,
            priceWork: this.state.priceWork,
            priceResult: this.state.priceResult
        };
        console.log('Добавлена запись в закупки (Плазма) => ' + JSON.stringify(buyPlasma));

        if (this.state.id === "_add") {
            BuyPlasmaService.createBuyPlasma(buyPlasma);
            this.props.navigate('/buy_plasma', { replace: true });
        } else {
            BuyPlasmaService.updateBuyPlasma(buyPlasma, this.state.id);
            this.props.navigate('/buy_plasma', { replace: true });
        }
    }

    changePlasmaNameHandler = (event) => {
        this.setState({ name: event.target.value })
    }

    changePlasmaCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changePlasmaPriceGoodsHandler = (event) => {
        this.setState({ priceGoods: event.target.value })
    }

    changePlasmaPriceWorkHandler = (event) => {
        this.setState({ priceWork: event.target.value })
    }

    changePlasmaPriceResultHandler = (event) => {
        this.setState({ priceResult: event.target.value })
    }

    cancel() {
        this.props.history.push('/buy_plasma');
    }

    getTitle() {
        if (this.state.id === "_add") {
            return <h3 className='text-center-form menu-item'> Добавить позицию в закупки (Плазма) </h3>
        } else {
            return <h3 className='text-center-form menu-item'> Изменить позицию в закупке (Плазма) </h3>
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
                                            value={this.state.name} onChange={this.changePlasmaNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Комментарий </label>
                                        <input placeholder='Заметки, комментарии' name='comment' className='form-control'
                                            value={this.state.comment} onChange={this.changePlasmaCommentHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Цена за товар </label>
                                        <input placeholder='Цена за расчётную единицу товара' name='priceGoods' className='form-control'
                                            value={this.state.priceGoods} onChange={this.changePlasmaPriceGoodsHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Стоимость работы </label>
                                        <input placeholder='Цена за работы на изготовление единицы товара' name='priceWork' className='form-control'
                                            value={this.state.priceWork} onChange={this.changePlasmaPriceWorkHandler} />
                                    </div>
                                    <div className='form-group-bottom'>
                                        <label> Итоговая цена </label>
                                        <input placeholder='Результирующая цена за готовую единицу товара' name='priceResult' className='form-control'
                                            value={this.state.priceResult} onChange={this.changePlasmaPriceResultHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateBuyPlasma}> Сохранить </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_plasma')} style={{ marginLeft: "10px" }}> Отмена </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(CreateBuyPlasmaComponent);