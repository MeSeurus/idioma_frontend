import React, { Component } from 'react';
import { withParams } from '../../hocs';
import StockMetalRusService from '../../service/stock_services/StockMetalRusService';
import LeftoversService from '../../service/leftovers_service/LeftoversService';

class SendToLeftoversMetalRus extends Component {

    constructor(props) {

        let { id } = props.params;

        super(props)

        this.state = {
            id: id,
            quantity: '',
            leftovers: {},
            stockMetalRus: {}
        }

        this.changeMetalRusQuantityHandler = this.changeMetalRusQuantityHandler.bind(this)
        this.saveOrUpdateStockMetalRus = this.saveOrUpdateStockMetalRus.bind(this)
    }

    componentDidMount() {
        StockMetalRusService.getStockMetalRusById(this.state.id).then(res => {
            this.setState({ stockMetalRus: res.data });
        });
    }

    saveOrUpdateStockMetalRus = (e) => {

        e.preventDefault();
        let stockMetalRus = {
            quantityManCurrent: this.state.stockMetalRus.quantityManCurrent - this.state.quantity,
        };
        let leftovers = {
            name: this.state.stockMetalRus.name,
            comment: this.state.stockMetalRus.comment,
            quantity: this.state.quantity,
            date: this.state.stockMetalRus.date
        };

        LeftoversService.createLeftovers(leftovers);
        StockMetalRusService.updateStockMetalRus(stockMetalRus, this.state.id);

        // console.log('После вынесения остатка (Российский металлопрокат) осталось => ' + JSON.stringify(stockMetalRus));
        this.props.navigate('/stock_metal_rus', { replace: true });
    }

    changeMetalRusQuantityHandler = (event) => {
        this.setState({ quantity: event.target.value })
    }

    cancel() {
        this.props.history.push('/stock_metal_rus');
    }

    getTitle() {
        return <h3 className='text-center-form menu-item'> Добавление в остаток (Российский металлопрокат) </h3>
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
                                    <div className='form-group-bottom'>
                                        <label> Направить в остаток </label>
                                        <input placeholder='Кол-во в расчётных единицах, направляемое в остаток' name='leftovers' className='form-control'
                                            value={this.state.quantity} onChange={this.changeMetalRusQuantityHandler} />
                                    </div>
                                    {/* <div className='form-group-bottom'>
                                        <label> Цена в расч. ед. </label>
                                        <input placeholder='Цена на товар в расчётных единицах' name='priceResult' className='form-control'
                                            value={this.state.pricePURuble} onChange={this.changeMetalRusPricePURubleHandler} />
                                    </div> */}
                                    <button className='btn btn-success' onClick={this.saveOrUpdateStockMetalRus}> Сохранить </button>
                                    <button className='btn btn-danger' onClick={() => this.props.navigate('/stock_metal_rus')} style={{ marginLeft: "10px" }}> Отмена </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(SendToLeftoversMetalRus);