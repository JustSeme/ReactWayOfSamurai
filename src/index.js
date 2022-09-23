import React from 'react';
import ReactDOM from 'react-dom/client';
import SamuraiJSApp from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

/* setInterval(() => {
  store.dispatch({ type: 'FAKE' })
}, 5000); */

root.render(
  <SamuraiJSApp />
);