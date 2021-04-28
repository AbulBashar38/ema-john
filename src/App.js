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
import { createContext, useState } from 'react';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

export const UserContext = createContext()
function App() {
  const [loggedInUser, setLoggedInUser]= useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]} >
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/shop'>
            <Shop></Shop>
          </Route>
          <PrivateRoute path='/manage'>
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path='/order'>
            <OrderReview></OrderReview>
          </Route>
          <Route path='/product/:productKey'>
            <ProductDetails></ProductDetails>
          </Route>
          <PrivateRoute path='/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>
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
      
    </UserContext.Provider>
  );
}

export default App;
