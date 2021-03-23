import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware,compose } from 'redux';
import reducer from './store/reducers/auth'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger =store=>{
  return next => {
  return action => {
  console. log( '[Middleware] Dispatching',action) ;
  const result= next(action);
  console. log( 'I [Middleware] next state',store.getState())
  return result;
     }
    }
   };

const store=createStore(reducer,composeEnhancers(applyMiddleware(logger,thunk))) 
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode></Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
