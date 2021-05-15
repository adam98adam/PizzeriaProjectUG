import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListUserComponent from "./components/ListUserComponent";
import HeaderComponent from "./components/HeaderComponent";
import CreateUserComponent from "./components/CreateUserComponent";
import UpdateUserComponent from "./components/UpdateUserComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import RegisterUserAddress from "./components/RegisterUserAddressComponent";
import RegisterUserAddressComponent from "./components/RegisterUserAddressComponent";
import HeaderUserHomePageComponent from "./components/HeaderUserHomePageComponent";
import UserPanelComponent from "./components/UserPanelComponent";
import EditAccountComponent from "./components/EditAccountComponent";
import EditUserComponent from "./components/EditUserComponent";
import EditAddressComponent from "./components/EditAddressComponent";
import UserOrdersComponent from "./components/UserOrdersComponent";
import AdminPanelComponent from "./components/AdminPanelComponent";
import AdminOrdersComponent from "./components/AdminOrdersComponent";
import AdminPizzaListComponent from "./components/AdminPizzaListComponent";
import AdminCrustListComponent from "./components/AdminCrustListComponent";
import AdminBakestyleListComponent from "./components/AdminBakestyleListComponent";
import AdminDrinksListComponent from "./components/AdminDrinksListComponent";
import AdminPizzasizeListComponent from "./components/AdminPizzasizeListComponent";
import AdminCutstyleListComponent from "./components/AdminCutstyleListComponent";
import AdminSaucesListComponent from "./components/AdminSaucesListComponent";

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={LoginComponent}></Route>
            <Route path="/register" component={RegisterComponent}></Route>
            <Route
              path="/register-user-address/:id"
              component={RegisterUserAddressComponent}
            ></Route>
            <Route path="/user/:id" component={UserPanelComponent}></Route>
            <Route path="/admin/:id" component={AdminPanelComponent}></Route>
            <Route
              path="/admin-orders"
              component={AdminOrdersComponent}
            ></Route>
            <Route
              path="/admin-pizza"
              component={AdminPizzaListComponent}
            ></Route>
            <Route
              path="/admin-crust"
              component={AdminCrustListComponent}
            ></Route>
            <Route
              path="/admin-bakestyle"
              component={AdminBakestyleListComponent}
            ></Route>
            <Route
              path="/admin-drinks"
              component={AdminDrinksListComponent}
            ></Route>
            <Route
              path="/admin-pizzasize"
              component={AdminPizzasizeListComponent}
            ></Route>
            <Route
              path="/admin-cutstyle"
              component={AdminCutstyleListComponent}
            ></Route>
            <Route
              path="/admin-sauces"
              component={AdminSaucesListComponent}
            ></Route>
            <Route
              path="/account-edit/:id"
              component={EditAccountComponent}
            ></Route>
            <Route
              path="/user-edit/:idAccount/:idUser"
              component={EditUserComponent}
            ></Route>
            <Route
              path="/address-edit/:idAccount/:idAddress"
              component={EditAddressComponent}
            ></Route>
            <Route
              path="/user-orders/:idAccount/:idUser"
              component={UserOrdersComponent}
            ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
