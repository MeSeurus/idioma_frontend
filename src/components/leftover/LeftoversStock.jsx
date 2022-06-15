import React, { Component } from 'react';
import { FiXOctagon, FiInfo, FiShoppingCart } from 'react-icons/fi'
import LeftoversService from '../../service/leftovers_service/LeftoversService';
import { withParams } from '../../hocs';

class LeftoversComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            leftovers: []
        }

        this.deleteLeftovers = this.deleteLeftovers.bind(this);
    }

    componentDidMount() {
        LeftoversService.getLeftovers().then((res) => {
            this.setState({ leftovers: res.data });
        });
    }

    deleteLeftovers(id) {
        LeftoversService.deleteLeftovers(id).then(res => {
            this.setState({ leftovers: this.state.leftovers.filter(leftovers => leftovers.id !== id) });
        });
    }

    render() {
        return (
            <div>
                <h2 className='text-center'> Остатки </h2>
                <div className='custom_row' style={{ overflowY: "scroll" }}>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th width='130px'>Дата закупки</th>
                                <th>Наименование</th>
                                <th>Комментарий</th>
                                <th>Кол-во</th>
                                <th width='90px'>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.leftovers.map(
                                    leftovers =>
                                        <tr key={leftovers.id}>
                                            <td>{leftovers.id}</td>
                                            <td>{leftovers.date}</td>
                                            <td>{leftovers.name}</td>
                                            <td>{leftovers.comment}</td>
                                            <td>{leftovers.quantity}</td>
                                            <td>
                                                <button style={{ marginLeft: "10px", alignSelf: "center" }} onClick={() => this.deleteLeftovers(leftovers.id)} className="btn btn-danger"><FiXOctagon /></button>
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

export default withParams(LeftoversComponent);