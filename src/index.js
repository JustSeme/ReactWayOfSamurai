import state from './state.js'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntiresTree = (state) => {
  root.render(
    <BrowserRouter>
      <App state={state} />
    </BrowserRouter>
  );
}

state.subscribe(rerenderEntiresTree)

rerenderEntiresTree(state)