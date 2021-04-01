import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware,compose,combineReducers } from 'redux';
// import reducer from './store/reducers/auth'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom';

const rootReducer=combineReducers({
  burgerBuilder:burgerBuilderReducer,
  order:orderReducer
});

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
   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)))
//const store=createStore(reducer,applyMiddleware(logger))  
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
