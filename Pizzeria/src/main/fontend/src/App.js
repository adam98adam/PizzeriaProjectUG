import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateUserComponent from './components/CreateUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import RegisterUserAddress from './components/RegisterUserAddressComponent';
import RegisterUserAddressComponent from './components/RegisterUserAddressComponent';
import HeaderUserHomePageComponent from './components/HeaderUserHomePageComponent';
import UserPanelComponent from './components/UserPanelComponent';
import EditAccountComponent from './components/EditAccountComponent';
import EditUserComponent from './components/EditUserComponent';
import EditAddressComponent from './components/EditAddressComponent';

function App() {
  return (
    <div>
      <Router>
          <div className="container">
            <Switch>
              <Route path ="/" exact  component = {LoginComponent}></Route>
              <Route path ="/register"  component = {RegisterComponent}></Route>
              <Route path ="/register-user-address/:id"  component = {RegisterUserAddressComponent}></Route>
              <Route path ="/user/:id"  component = {UserPanelComponent}></Route>
              <Route path ="/account-edit/:id"  component = {EditAccountComponent}></Route>
              <Route path ="/user-edit/:idAccount/:idUser" component = {EditUserComponent}></Route>
              <Route path ="/address-edit/:idAccount/:idAddress" component = {EditAddressComponent}></Route>
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
