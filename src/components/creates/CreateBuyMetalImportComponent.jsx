import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withParams } from '../../hocs';
import BuyMetalImportService from '../../service/buy_services/BuyMetalImportService';

class CreateBuyMetalImportComponent extends Component {

    constructor(props) {
        super(props)

        let { id } = props.params;

        this.state = {
            id: id,
            name: '',
            comment: '',
            priceEuro: '',
            priceRuble: '',
            coef: '',
            pricePURuble: ''
        }

        this.changeMetalImportCommentHandler = this.changeMetalImportCommentHandler.bind(this)
        this.changeMetalImportNameHandler = this.changeMetalImportNameHandler.bind(this)
        this.changeMetalImportPriceEuroHandler = this.changeMetalImportPriceEuroHandler.bind(this)
        this.changeMetalImportPriceRubleHandler = this.changeMetalImportPriceRubleHandler.bind(this)
        this.changeMetalImportCoefHandler = this.changeMetalImportCoefHandler.bind(this)
        this.changeMetalImportPricePURubleHandler = this.changeMetalImportPricePURubleHandler.bind(this)
        this.saveOrUpdateBuyMetalImport = this.saveOrUpdateBuyMetalImport.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "_add") {
            return
        } else {
            BuyMetalImportService.getBuyMetalImportById(this.state.id).then((res) => {
                let buyMetalImport = res.data;
                this.setState({
                    name: buyMetalImport.name,
                    comment: buyMetalImport.comment,
                    priceEuro: buyMetalImport.priceEuro,
                    priceRuble: buyMetalImport.priceRuble,
                    coef: buyMetalImport.coef,
                    pricePURuble: buyMetalImport.pricePURuble
                });
            });
        }
    }

    saveOrUpdateBuyMetalImport = (e) => {
        e.preventDefault();
        let buyMetalImport = {
            name: this.state.name,
            comment: this.state.comment,
            priceEuro: this.state.priceEuro,
            priceRuble: this.state.priceRuble,
            coef: this.state.coef,
            pricePURuble: this.state.pricePURuble
        };
        console.log('Добавлена запись в закупки (Металлопрокат (SAEZ)) => ' + JSON.stringify(buyMetalImport));

        if (this.state.id === "_add") {
            BuyMetalImportService.createBuyMetalImport(buyMetalImport);
            this.props.navigate('/buy_metal_import', { replace: true });
        } else {
            BuyMetalImportService.updateBuyMetalImport(buyMetalImport, this.state.id);
            this.props.navigate('/buy_metal_import', { replace: true });
        }
    }

    changeMetalImportNameHandler = (event) => {
        this.setState({ name: event.target.value })
    }

    changeMetalImportCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeMetalImportPriceEuroHandler = (event) => {
        this.setState({ priceEuro: event.target.value })
    }

    changeMetalImportPriceRubleHandler = (event) => {
        this.setState({ priceRuble: event.target.value })
    }

    changeMetalImportCoefHandler = (event) => {
        this.setState({ coef: event.target.value })
    }

    changeMetalImportPricePURubleHandler = (event) => {
        this.setState({ pricePURuble: event.target.value })
    }

    cancel() {
        this.props.history.push('/buy_metal_import');
    }

    getTitle() {
        if (this.state.id === "_add") {
            return <h3 className='text-center-form menu-item'> Добавить позицию в закупки (Импортный металлопрокат (Прочие)) </h3>
        } else {
            return <h3 className='text-center-form menu-item'> Изменить позицию в закупке (Импортный металлопрокат (Прочие)) </h3>
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
                                            value={this.state.name} onChange={this.changeMetalImportNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Комментарий </label>
                                        <input placeholder='Заметки, комментарии' name='comment' className='form-control'
                                            value={this.state.comment} onChange={this.changeMetalImportCommentHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Цена закупки (Евро) </label>
                                        <input placeholder='Цена закупки материала в Евро' name='priceEuro' className='form-control'
                                            value={this.state.priceEuro} onChange={this.changeMetalImportPriceEuroHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Цена закупки (Руб.) </label>
                                        <input placeholder='Цена закупки материала в рублях' name='priceRuble' className='form-control'
                                            value={this.state.priceRuble} onChange={this.changeMetalImportPriceRubleHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Коэффициент материала </label>
                                        <input placeholder='Коэффициент перевода материала в расчётные единицы' name='coef' className='form-control'
                                            value={this.state.coef} onChange={this.changeMetalImportCoefHandler} />
                                    </div>
                                    <div className='form-group-bottom'>
                                        <label> Цена в расч. ед. </label>
                                        <input placeholder='Цена на товар в расчётных единицах' name='pricePURuble' className='form-control'
                                            value={this.state.pricePURuble} onChange={this.changeMetalImportPricePURubleHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateBuyMetalImport}> Сохранить </button>
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

export default withParams(CreateBuyMetalImportComponent);