import React from 'react';
import Backend from '../services/backend';

const backend = new Backend();

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roubleToUsd: null
        };
    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            this.props.history.push('/login');
        }
        let rate;
        backend.getExchangeRate()
            .then(response => {
                rate = response.data.Valute.USD.Value;
                this.setState({ roubleToUsd: rate });

            })
            .catch(error => {
                this.props.history.push('/login');
            });
    }

    onLogout = () => {
        backend.logout();
        this.props.history.push('/login');

    }
  
    render() {
        let { roubleToUsd } = this.state;
        return (
            <div className="exchange-rate">
                <h1>Congratulations!</h1>
                <p> It's Russian rouble to United States dollar exchange rate.</p>
                <p>{roubleToUsd}</p>
               <button onClick={this.onLogout}>Выйти</button>
            </div>
        );
    }
}