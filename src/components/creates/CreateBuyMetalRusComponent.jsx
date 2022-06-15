import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withParams } from '../../hocs';
import BuyMetalRusService from '../../service/buy_services/BuyMetalRusService';

class CreateBuyMetalRusComponent extends Component {

    constructor(props) {
        super(props)

        let { id } = props.params;

        this.state = {
            id: id,
            name: '',
            comment: '',
            priceRuble: '',
            coef: '',
            pricePURuble: ''
        }

        this.changeMetalRusCommentHandler = this.changeMetalRusCommentHandler.bind(this)
        this.changeMetalRusNameHandler = this.changeMetalRusNameHandler.bind(this)
        this.changeMetalRusPriceRubleHandler = this.changeMetalRusPriceRubleHandler.bind(this)
        this.changeMetalRusCoefHandler = this.changeMetalRusCoefHandler.bind(this)
        this.saveOrUpdateBuyMetalRus = this.saveOrUpdateBuyMetalRus.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "_add") {
            return
        } else {
            BuyMetalRusService.getBuyMetalRusById(this.state.id).then((res) => {
                let buyMetalRus = res.data;
                this.setState({
                    name: buyMetalRus.name,
                    comment: buyMetalRus.comment,
                    priceRuble: buyMetalRus.priceRuble,
                    coef: buyMetalRus.coef,
                    pricePURuble: buyMetalRus.pricePURuble,
                });
            });
        }
    }

    saveOrUpdateBuyMetalRus = (e) => {
        e.preventDefault();
        let buyMetalRus = {
            name: this.state.name,
            comment: this.state.comment,
            priceRuble: this.state.priceRuble,
            coef: this.state.coef,
            pricePURuble: this.state.priceRuble / 1000 * this.state.coef,
        };
        console.log('Добавлена запись в закупки (Металлопрокат (SAEZ)) => ' + JSON.stringify(buyMetalRus));

        if (this.state.id === "_add") {
            BuyMetalRusService.createBuyMetalRus(buyMetalRus);
            this.props.navigate('/buy_metal_rus', { replace: true });
        } else {
            BuyMetalRusService.updateBuyMetalRus(buyMetalRus, this.state.id);
            this.props.navigate('/buy_metal_rus', { replace: true });
        }
    }

    changeMetalRusNameHandler = (event) => {
        this.setState({ name: event.target.value })
    }

    changeMetalRusCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeMetalRusPriceRubleHandler = (event) => {
        this.setState({ priceRuble: event.target.value })
    }

    changeMetalRusCoefHandler = (event) => {
        this.setState({ coef: event.target.value })
    }

    cancel() {
        this.props.history.push('/buy_metal_rus');
    }

    getTitle() {
        if (this.state.id === "_add") {
            return <h3 className='text-center-form menu-item'> Добавить позицию в закупки (Российский металлопрокат) </h3>
        } else {
            return <h3 className='text-center-form menu-item'> Изменить позицию в закупке (Российский металлопрокат) </h3>
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
                                            value={this.state.name} onChange={this.changeMetalRusNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Комментарий </label>
                                        <input placeholder='Заметки, комментарии' name='comment' className='form-control'
                                            value={this.state.comment} onChange={this.changeMetalRusCommentHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Цена закупки </label>
                                        <input placeholder='Цена закупки материала' name='priceGoods' className='form-control'
                                            value={this.state.priceRuble} onChange={this.changeMetalRusPriceRubleHandler} />
                                    </div>
                                    <div className='form-group-bottom'>
                                        <label> Коэффициент материала </label>
                                        <input placeholder='Коэффициент перевода материала в расчётные единицы' name='priceWork' className='form-control'
                                            value={this.state.coef} onChange={this.changeMetalRusCoefHandler} />
                                    </div>
                                    {/* <div className='form-group-bottom'>
                                        <label> Цена в расч. ед. </label>
                                        <input placeholder='Цена на товар в расчётных единицах' name='priceResult' className='form-control'
                                            value={this.state.pricePURuble} onChange={this.changeMetalRusPricePURubleHandler} />
                                    </div> */}
                                    <button className='btn btn-success' onClick={this.saveOrUpdateBuyMetalRus}> Сохранить </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_metal_rus')} style={{ marginLeft: "10px" }}> Отмена </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(CreateBuyMetalRusComponent);