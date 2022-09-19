import store from './redux/redux-store.js'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

/* setInterval(() => {
  store.dispatch({ type: 'FAKE' })
}, 5000); */


root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);