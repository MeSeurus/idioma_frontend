import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withParams } from '../../hocs';
import BuyMetalSaezService from '../../service/buy_services/BuyMetalSaezService';

class CreateBuyMetalSaezComponent extends Component {

    constructor(props) {
        super(props)

        let { id } = props.params;

        this.state = {
            id: id,
            name: '',
            comment: '',
            priceEuro: '',
            coef: '',
            priceRuble: ''
        }

        this.changeMetalSaezCommentHandler = this.changeMetalSaezCommentHandler.bind(this)
        this.changeMetalSaezNameHandler = this.changeMetalSaezNameHandler.bind(this)
        this.changeMetalSaezPriceEuroHandler = this.changeMetalSaezPriceEuroHandler.bind(this)
        this.changeMetalSaezCoefHandler = this.changeMetalSaezCoefHandler.bind(this)
        this.changeMetalSaezPriceRubleHandler = this.changeMetalSaezPriceRubleHandler.bind(this)
        this.saveOrUpdateBuyMetalSaez = this.saveOrUpdateBuyMetalSaez.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "_add") {
            return
        } else {
            BuyMetalSaezService.getBuyMetalSaezById(this.state.id).then((res) => {
                let buyMetalSaez = res.data;
                this.setState({
                    name: buyMetalSaez.name,
                    comment: buyMetalSaez.comment,
                    priceEuro: buyMetalSaez.priceEuro,
                    coef: buyMetalSaez.coef,
                    priceRuble: buyMetalSaez.priceRuble
                });
            });
        }
    }

    saveOrUpdateBuyMetalSaez = (e) => {
        e.preventDefault();
        let buyMetalSaez = {
            name: this.state.name,
            comment: this.state.comment,
            priceEuro: this.state.priceEuro,
            coef: this.state.coef,
            priceRuble: this.state.priceRuble
        };
        console.log('Добавлена запись в закупки (Металлопрокат (SAEZ)) => ' + JSON.stringify(buyMetalSaez));

        if (this.state.id === "_add") {
            BuyMetalSaezService.createBuyMetalSaez(buyMetalSaez);
            this.props.navigate('/buy_metal_saez', { replace: true });
        } else {
            BuyMetalSaezService.updateBuyMetalSaez(buyMetalSaez, this.state.id);
            this.props.navigate('/buy_metal_saez', { replace: true });
        }
    }

    changeMetalSaezNameHandler = (event) => {
        this.setState({ name: event.target.value })
    }

    changeMetalSaezCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeMetalSaezPriceEuroHandler = (event) => {
        this.setState({ priceEuro: event.target.value })
    }

    changeMetalSaezCoefHandler = (event) => {
        this.setState({ coef: event.target.value })
    }

    changeMetalSaezPriceRubleHandler = (event) => {
        this.setState({ priceRuble: event.target.value })
    }

    cancel() {
        this.props.history.push('/buy_metal_saez');
    }

    getTitle() {
        if (this.state.id === "_add") {
            return <h3 className='text-center-form menu-item'> Добавить позицию в закупки (Металлопрокат (SAEZ)) </h3>
        } else {
            return <h3 className='text-center-form menu-item'> Изменить позицию в закупке (Металлопрокат (SAEZ)) </h3>
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
                                            value={this.state.name} onChange={this.changeMetalSaezNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Комментарий </label>
                                        <input placeholder='Заметки, комментарии' name='comment' className='form-control'
                                            value={this.state.comment} onChange={this.changeMetalSaezCommentHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Цена за товар в Евро </label>
                                        <input placeholder='Цена за расчётную единицу товара в Евро' name='priceGoods' className='form-control'
                                            value={this.state.priceEuro} onChange={this.changeMetalSaezPriceEuroHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Коэффициент логистики </label>
                                        <input placeholder='Логистический коэффициент для товара' name='priceWork' className='form-control'
                                            value={this.state.coef} onChange={this.changeMetalSaezCoefHandler} />
                                    </div>
                                    <div className='form-group-bottom'>
                                        <label> Итоговая цена с доставкой </label>
                                        <input placeholder='Результирующая цена за единицу товара в рублях' name='priceResult' className='form-control'
                                            value={this.state.priceRuble} onChange={this.changeMetalSaezPriceRubleHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateBuyMetalSaez}> Сохранить </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_metal_saez')} style={{ marginLeft: "10px" }}> Отмена </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(CreateBuyMetalSaezComponent);