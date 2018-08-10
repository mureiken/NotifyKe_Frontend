import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConnectedApp from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './helpers/store';
import { PersistGate } from 'redux-persist/integration/react'
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
	  <Provider store={store}>
	  	<PersistGate loading={null} persistor={persistor}>
        	<ConnectedApp />
        </PersistGate>
    </Provider>,
	document.getElementById('root')
	);

registerServiceWorker();
