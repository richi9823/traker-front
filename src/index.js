import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import axios from 'axios';
import {composeWithDevTools} from 'redux-devtools-extension'
import App from './components/App';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';
import { API_BASE_URL } from './constants/apiConf';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = "application/json";
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

const store = createStore(
  reducers,
  composeWithDevTools(
  applyMiddleware(ReduxThunk)
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();