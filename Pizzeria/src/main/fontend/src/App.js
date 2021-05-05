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

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Switch>
              <Route path ="/" exact  component = {LoginComponent}></Route>
              <Route path ="/register" component = {RegisterComponent}></Route>
              <Route path ="/register-user-address/:id" component = {RegisterUserAddressComponent}></Route>
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
