import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import newStore from './app/store'
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={newStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
