import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateUserComponent from './components/CreateUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Switch>
              <Route path ="/" exact component = {ListUserComponent}></Route>
              <Route path ="/users" component = {ListUserComponent}></Route>
              <Route path ="/add-user" component = {CreateUserComponent}></Route>
              <Route path ="/update-user/:id" component = {UpdateUserComponent}></Route>
              <Route path ="/login" component = {LoginComponent}></Route>
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
