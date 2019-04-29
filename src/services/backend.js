import axios from 'axios';

let instance = null;

export default class Backend {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    login(data) {
        return new Promise((resolve, reject) => {
            this.authMock(data)
            .then(response => {
                let token = response.data.token;
                localStorage.setItem('authToken', token);
                resolve(token);
            })
            .catch(error => {
                reject(error);
            })
        });
    }

    logout() {
        localStorage.removeItem('authToken');
    }

    //Имитация ответа сервера
    authMock(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.login === 'admin1' && data.password === 'password') {
                    resolve({ data: { token: 'pqdvl1y0v7fjqaaie7osgpxhtf21jjuoojw56txtymeu3rtc2wd' } })
                } else {
                    reject(new Error('Invalid login or password!'));
                }
            }, 500);
        })
        
    }

    getExchangeRate() {
        if (localStorage.authToken) {
            return axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
        } else {
            //Mock unauthorized
            return new Promise((resolve, reject) => {
                reject(new Error('Unauthorized'));
            });
        }
    }

}

