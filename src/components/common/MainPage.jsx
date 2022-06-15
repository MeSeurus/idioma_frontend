import React, { Component } from 'react';
import logo from './logo.png';

class MainPage extends Component {
    constructor(props) {

        super(props)

        this.state = {

        }

    }

    render() {
        return (
            <div>
                <img className='my-img' src={logo} />
                {/* <div>
                    <h3>Привет</h3>
                </div> */}
            </div>
        );
    }
}

export default MainPage;