import './App.css';
import Header from './Component/Header/Header';
import Shop from './Component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OrderReview from './Component/OrderReview/OrderReview';
import Inventory from './Component/Inventory/Inventory';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Shipment from './Component/Shipment/Shipment';
import Login from './Component/Login/Login';

function App() {
  return (
    <div >
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/shop'>
            <Shop></Shop>
          </Route>
          <Route path='/manage'>
            <Inventory></Inventory>
          </Route>
          <Route path='/order'>
            <OrderReview></OrderReview>
          </Route>
          <Route path='/product/:productKey'>
            <ProductDetails></ProductDetails>
          </Route>
          <Route path='/shipment'>
            <Shipment></Shipment>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route exact path="/">
          <Shop></Shop>
          </Route>
          <Route path="*">
            <h1>page not found</h1>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
