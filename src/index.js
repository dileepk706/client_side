import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <section className="font-sans bg-purple-100 rounded">
      <App />
    </section>
    </Provider>
 
  </React.StrictMode>
);
 
reportWebVitals();
