import store from './store.js'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntiresTree = (state, onMessageChange, newMessage) => {
  root.render(
    <BrowserRouter>
      <App state={state} onMessageChange={onMessageChange} newMessage={newMessage} />
    </BrowserRouter>
  );
}

store.subscribe(rerenderEntiresTree)

rerenderEntiresTree(store.getState(), store.onMessageChange, store.newMessage)