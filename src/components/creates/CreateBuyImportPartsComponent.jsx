import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withParams } from '../../hocs';
import BuyImportPartsService from '../../service/buy_services/BuyImportPartsService';

class CreateBuyImportPartsComponent extends Component {

    constructor(props) {
        super(props)

        let { id } = props.params;

        this.state = {
            id: id,
            name: '',
            comment: '',
            price: ''
        }

        this.changeImportPartsCommentHandler = this.changeImportPartsCommentHandler.bind(this)
        this.changeImportPartsNameHandler = this.changeImportPartsNameHandler.bind(this)
        this.changeImportPartsPriceHandler = this.changeImportPartsPriceHandler.bind(this)
        this.saveOrUpdateBuyImportParts = this.saveOrUpdateBuyImportParts.bind(this)
    }

    componentDidMount() {

        if (this.state.id === "_add") {
            return
        } else {
            BuyImportPartsService.getBuyImportPartsById(this.state.id).then((res) => {
                let buyImportParts = res.data;
                this.setState({
                    name: buyImportParts.name,
                    comment: buyImportParts.comment,
                    price: buyImportParts.price
                });
            });
        }
    }

    saveOrUpdateBuyImportParts = (e) => {
        e.preventDefault();
        let buyImportParts = { name: this.state.name, comment: this.state.comment, price: this.state.price };
        console.log('Добавлена запись в закупки (Импортные комплектующие) => ' + JSON.stringify(buyImportParts));

        if (this.state.id === "_add") {
            BuyImportPartsService.createBuyImportParts(buyImportParts);
            this.props.navigate('/buy_import_parts', { replace: true });
        } else {
            BuyImportPartsService.updateBuyImportParts(buyImportParts, this.state.id);
            this.props.navigate('/buy_import_parts', { replace: true });
        }
    }

    changeImportPartsNameHandler = (event) => {
        this.setState({ name: event.target.value })
    }

    changeImportPartsCommentHandler = (event) => {
        this.setState({ comment: event.target.value })
    }

    changeImportPartsPriceHandler = (event) => {
        this.setState({ price: event.target.value })
    }

    cancel() {
        this.props.history.push('/buy_import_parts');
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
                                            value={this.state.name} onChange={this.changeImportPartsNameHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label> Комментарий </label>
                                        <input placeholder='Заметки, комментарии' name='comment' className='form-control'
                                            value={this.state.comment} onChange={this.changeImportPartsCommentHandler} />
                                    </div>
                                    <div className='form-group-bottom'>
                                        <label> Цена </label>
                                        <input placeholder='Цена за расчётную единицу' name='price' className='form-control'
                                            value={this.state.price} onChange={this.changeImportPartsPriceHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveOrUpdateBuyImportParts}> Сохранить </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/buy_import_parts')} style={{ marginLeft: "10px" }}> Отмена </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(CreateBuyImportPartsComponent);