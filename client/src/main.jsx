import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './store/store'; // Import the store
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Wrap App with Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);