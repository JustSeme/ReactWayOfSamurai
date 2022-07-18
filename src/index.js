import store from './redux/redux-store.js'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './StoreContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntiresTree = (state) => {
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

rerenderEntiresTree(store.getState())

store.subscribe(() => {
  rerenderEntiresTree(store.getState())
})