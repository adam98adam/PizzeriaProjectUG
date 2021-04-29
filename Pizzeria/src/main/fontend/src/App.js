import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateUserComponent from './components/CreateUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Switch>
              <Route path ="/" exact  component = {LoginComponent}></Route>
              <Route path ="/register" component = {RegisterComponent}></Route>
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
