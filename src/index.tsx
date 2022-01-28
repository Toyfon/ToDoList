import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from "./app/Redux-store";
import * as serviceWorker from './serviceWorker';

import './index.css';
import {App} from "./app/App";


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
