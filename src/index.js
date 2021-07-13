import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {store} from './store/store';
import {persistor} from './store/store';


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate persistor = {persistor}>
      <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();