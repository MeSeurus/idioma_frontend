import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withParams } from '../../hocs';
import BuyCabinOtherService from '../../service/buy_services/BuyCabinOtherService';

class CreateBuyCabinOtherComponent extends Component {

    constructor(props) {
        super(props)

        let { id } = props.params;

        this.state = {
            id: id,
            name: '',
            comment: '',
            price: ''
        }

        this.changeCabinOtherCommentHandler = this.changeCabinOtherCommentHandler.bind(this)
        this.changeCabinOtherNameHandler = this.changeCabinOtherNameHandler.bind(this)
        this.changeCabinOtherPriceHandler = this.changeCabinOtherPriceHandler.bind(this)
        this.saveOrUpdateBuyCabinOther = this.saveOrUpdateBuyCabinOther.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "_add") {
            return
        } else {
            BuyCabinOtherService.getBuyCabinOtherById(this.state.id).then((res) => {
                let buyCabinOther = res.data;
                this.setState({
                    name: buyCabinOther.name,
                    comment: buyCabinOther.comment,
                    price: buyCabinOther.price
                });
            });
        }
    }

    saveOrUpdateBuyCabinOther = (e) => {
        e.preventDefault();
        let buyCabinOther = { name: this.state.name, comment: this.state.comment, price: this.state.price };
        console.log('Добавлена запись в закупки (Детали для кабины) => ' + JSON.stringify(buyCabinOther));

        if (this.state.id === "_add") {
            BuyCabinOtherService.createBuyCabinOther(buyCabinOther);
            this.props.navigate('/buy_cabin_other', { replace: true });
        } else {
            BuyCabinOtherService.updateBuyCabinOther(buyCabinOther, this.state.id);
            this.props.navigate('/buy_cabin_other', { replace: true });
        }
    }

    changeCabinOtherNameHandler = (event) => {
        this.setState({ name: event.target.value })
    }

    changeCabinOtherCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeCabinOtherPriceHandler = (event) => {
        this.setState({ price: event.target.value })
    }

    cancel() {
        this.props.history.push('/buy_cabin_other');
    }

    getTitle() {
        if (this.state.id === "_add") {
            return <h3 className='text-center-form menu-item'> Добавить позицию в закупки (Детали для кабины) </h3>
        } else {
            return <h3 className='text-center-form menu-item'> Изменить позицию в закупке (Детали для кабины) </h3>
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
                                            value={this.state.name} onChange={this.changeCabinOtherNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Комментарий </label>
                                        <input placeholder='Заметки, комментарии' name='comment' className='form-control'
                                            value={this.state.comment} onChange={this.changeCabinOtherCommentHandler} />
                                    </div>
                                    <div className='form-group-bottom'>
                                        <label> Цена </label>
                                        <input placeholder='Цена за расчётную единицу' name='price' className='form-control'
                                            value={this.state.price} onChange={this.changeCabinOtherPriceHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateBuyCabinOther}> Сохранить </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_cabin_other')} style={{ marginLeft: "10px" }}> Отмена </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(CreateBuyCabinOtherComponent);