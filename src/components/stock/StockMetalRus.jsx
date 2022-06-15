import React, { Component } from 'react';
import { FiXOctagon, FiInfo } from 'react-icons/fi'
import StockMetalRusService from '../../service/stock_services/StockMetalRusService';
import { withParams } from '../../hocs';
import Modal from '../common/Modal';

class StockMetalRusComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show: false,
            currentId: '',
            stockMetalRus: []
        };

        this.editStockMetalRus = this.editStockMetalRus.bind(this);
        this.deleteStockMetalRus = this.deleteStockMetalRus.bind(this);
        this.showModal = this.showModal.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    componentDidMount() {
        StockMetalRusService.getStockMetalRus().then((res) => {
            this.setState({ stockMetalRus: res.data });
        });
    }

    showModal(id) {
        this.setState({ show: !this.state.show });
        this.setState({ currentId: id })
    };


    editStockMetalRus(id) {
        this.props.navigate('/info_stock_metal_rus/' + id)
    }

    sendToLeftoversMetalRus(id) {
        this.showModal(id);
        this.props.navigate('/send_to_leftovers_metal_rus/' + id)
    }

    deleteStockMetalRus(id) {
        StockMetalRusService.deleteStockMetalRus(id).then(res => {
            this.setState({ stockMetalRus: this.state.stockMetalRus.filter(stockMetalRus => stockMetalRus.id !== id) });
        });
    }

    purchaseStockMetalRus(id) {
        this.props.navigate('/purchase_metal_rus/' + id)
    }

    deleteHandler(id) {
        this.deleteStockMetalRus(id);
        this.showModal(id);
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Наличие - Российский металлопрокат </h2>
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th width='130px'>Дата закупки</th>
                                <th>Наименование</th>
                                <th>Комментарий</th>
                                <th>Кол-во</th>
                                <th width='130px'>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.stockMetalRus.map(
                                    stockMetalRus =>
                                        <tr key={stockMetalRus.id}>
                                            <td>{stockMetalRus.id}</td>
                                            <td>{stockMetalRus.date}</td>
                                            <td>{stockMetalRus.name}</td>
                                            <td>{stockMetalRus.comment}</td>
                                            <td>{stockMetalRus.quantityManCurrent} / {stockMetalRus.quantityManBought}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editStockMetalRus(stockMetalRus.id)} className="btn btn-info"> <FiInfo /> </button>
                                                <button style={{ marginLeft: "10px" }} className="btn btn-danger" onClick={e => { this.showModal(stockMetalRus.id); }}><FiXOctagon /></button>
                                                < Modal id={stockMetalRus.id} onClose={this.showModal} show={this.state.show}>
                                                    <div className='modalBackground'>
                                                        <div className='modalContent'>
                                                            <div className='modalHeader'>
                                                                <h5> Удаление / вынесение в остаток </h5>
                                                            </div>
                                                            <div className='modalBody'>
                                                                <p> Выберите необходимое действие </p>
                                                            </div>
                                                            <div className='modalFooter' style={{ display: "flex", placeContent: "start space-evenly" }}>
                                                                <button className="btn btn-info" onClick={() => { this.sendToLeftoversMetalRus(this.state.currentId) }}> В остаток </button>
                                                                <button className="btn btn-danger" onClick={() => { this.deleteHandler(this.state.currentId) }}> Удаление </button>
                                                                <button className="btn btn-danger" onClick={
                                                                    this.showModal
                                                                }> Отмена </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withParams(StockMetalRusComponent);