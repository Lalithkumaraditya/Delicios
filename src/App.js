import logo from './logo.svg';
import './App.css';
import Button from './Components/UI/Button/Button'
import Input from './Components/UI/Input/Input'
import NavigationItems from './Components/UI/Navigation/NavigationItems/NavigationItems.js'
// import Layout from './Containers/Layout/Layout'
import Login from './Containers/Login/Login';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import {BroserRouter, BrowserRouter, Switch} from 'react-router-dom'
import Checkout from './Containers/Checkout/Checkout'
import {Route} from 'react-router-dom';
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <Login /> */}
      <Layout> 
        <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/" exact component={BurgerBuilder} />
        
        </Switch>
      </Layout>
    </div>
    </BrowserRouter>
  );
}

export default App;
