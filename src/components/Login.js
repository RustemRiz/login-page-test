import React from 'react';
import Backend from '../services/backend';

const backend = new Backend();

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
    }

    setLogin = (e) => {
        let login = e.target.value;
        this.setState({ login });
    }
    
    setPassword = (e) =>{
        let password = e.target.value;
        this.setState({ password });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { login, password } = this.state;
        backend.login({ login, password })
            .then(response => {
                this.props.history.push('/');
            })
            .catch(error => {
                alert(error);
            })
    }

    render() {
        let { login, password } = this.state;
        return (
            <div className="login">
                <form onSubmit={this.onSubmit}
                >
                    <input 
                        type="text" 
                        value={login} 
                        onChange={this.setLogin} 
                        placeholder="Login"
                        pattern="[a-z0-9]{6,}"
                        title="Login can only contain lowercase letters and digits, and must be at least 6 characters."                    
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={this.setPassword} 
                        placeholder="Password"/>
                    <button type="submit">Log in</button>
                </form>
            </div>
        );
    }
}