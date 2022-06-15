import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withParams } from '../../hocs';
import BuyElectricsService from '../../service/buy_services/BuyElectricsService';

class CreateBuyElectricsComponent extends Component {

    constructor(props) {
        super(props)

        let { id } = props.params;

        this.state = {
            id: id,
            name: '',
            comment: '',
            price: ''
        }

        this.changeElectricCommentHandler = this.changeElectricCommentHandler.bind(this)
        this.changeElectricNameHandler = this.changeElectricNameHandler.bind(this)
        this.changeElectricPriceHandler = this.changeElectricPriceHandler.bind(this)
        this.saveOrUpdateBuyElectrics = this.saveOrUpdateBuyElectrics.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "_add") {
            return
        } else {
            BuyElectricsService.getBuyElectricsById(this.state.id).then((res) => {
                let buyElectrics = res.data;
                this.setState({
                    name: buyElectrics.name,
                    comment: buyElectrics.comment,
                    price: buyElectrics.price
                });
            });
        }
    }

    saveOrUpdateBuyElectrics = (e) => {
        e.preventDefault();
        let buyElectrics = { name: this.state.name, comment: this.state.comment, price: this.state.price };
        console.log('Добавлена запись в закупки (Электрика) => ' + JSON.stringify(buyElectrics));

        if (this.state.id === "_add") {
            BuyElectricsService.createBuyElectrics(buyElectrics);
            this.props.navigate('/buy_electrics', { replace: true });
        } else {
            BuyElectricsService.updateBuyElectrics(buyElectrics, this.state.id);
            this.props.navigate('/buy_electrics', { replace: true });
        }
    }

    changeElectricNameHandler = (event) => {
        this.setState({ name: event.target.value })
    }

    changeElectricCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeElectricPriceHandler = (event) => {
        this.setState({ price: event.target.value })
    }

    cancel() {
        this.props.history.push('/buy_electrics');
    }

    getTitle() {
        if (this.state.id === "_add") {
            return <h3 className='text-center-form menu-item'> Добавить позицию в закупки (Электрика) </h3>
        } else {
            return <h3 className='text-center-form menu-item'> Изменить позицию в закупке (Электрика) </h3>
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
                                            value={this.state.name} onChange={this.changeElectricNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Комментарий </label>
                                        <input placeholder='Заметки, комментарии' name='comment' className='form-control'
                                            value={this.state.comment} onChange={this.changeElectricCommentHandler} />
                                    </div>
                                    <div className='form-group-bottom'>
                                        <label> Цена </label>
                                        <input placeholder='Цена за расчётную единицу' name='price' className='form-control'
                                            value={this.state.price} onChange={this.changeElectricPriceHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateBuyElectrics}> Сохранить </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_electrics')} style={{ marginLeft: "10px" }}> Отмена </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(CreateBuyElectricsComponent);