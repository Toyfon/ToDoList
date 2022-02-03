import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from "./app/Redux-store";
import * as serviceWorker from './serviceWorker';

import './index.css';
import {App} from "./app/App";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById('root'));


serviceWorker.unregister();
