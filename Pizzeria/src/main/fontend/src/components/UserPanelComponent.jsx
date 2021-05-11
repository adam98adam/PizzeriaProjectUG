import React, { Component } from 'react';
import AccountService from '../services/AccountService';
import AddressService from '../services/AddressService';
import OrdersService from '../services/OrdersService';
import PizzaService from '../services/PizzaService';
import UserService from '../services/UserService';

class UserPanelComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idAccount: this.props.match.params.id,
            login:'',
            password:'',
            idUser:'',
            name:'',
            surname:'',
            email:'',
            phonenumber:'',
            idAddress:'',
            city:'',
            street:'',
            number:'',
            pizza:[]

        }
    }

    componentDidMount(){
        AccountService.getAccountById(parseInt(this.props.match.params.id, 10)).then((res) => {
            console.log(res.data)
            this.setState({login: res.data.login})
            this.setState({password: res.data.password})
            this.setState({idUser: res.data.user.id})
            this.setState({name: res.data.user.name})
            this.setState({surname: res.data.user.surname})
            this.setState({email: res.data.user.email})
            this.setState({phonenumber: res.data.user.phonenumber})
          
            
            AddressService.getAddressByUserId(parseInt(this.state.idUser,10)).then((res) => {
                console.log(res.data)
                this.setState({idAddress: res.data.id})
                this.setState({city: res.data.city})
                this.setState({street: res.data.street})
                this.setState({number: res.data.number})
            })

            PizzaService.getAllPizza().then((res) =>{
                console.log(res.data)
                this.setState({pizza: res.data})
                console.log(this.state.pizza)

            })
            
        })


    }

    user = (idAccount,idUser) => {
        this.props.history.push(`/user-edit/${idAccount}/${idUser}`);
    }

    account = (idAccount) => {
        this.props.history.push(`/account-edit/${idAccount}`);
    }

    address = (idAccount,idAddress) => {
        this.props.history.push(`/address-edit/${idAccount}/${idAddress}`);
    }

    deleteAccount = (idUser) => {
        UserService.deleteUser(idUser).then((res) => {
            this.props.history.push("/");
        })
        
    }

    myOrders = (idAccount,idUser) => {
        this.props.history.push(`/user-orders/${idAccount}/${idUser}`);
        
    }

    

    choosePizza = (id) => {
        console.log(id)
    }

    logout = () => {
        this.props.history.push("/");
    }



    
    render() {
        return (
    <div>
            <header>
                <nav>
                    <a>Pizza</a> |
                    <a onClick={() => this.account(parseInt(this.state.idAccount,10))}>Account</a> |
                    <a onClick={() => this.user(parseInt(this.state.idAccount,10),parseInt(this.state.idUser,10))}>User</a> |
                    <a onClick={() => this.address(parseInt(this.state.idAccount,10),parseInt(this.state.idAddress,10))}>Address</a> |
                    <a onClick={() => this.myOrders(parseInt(this.state.idAccount,10),parseInt(this.state.idUser,10))}>My Orders</a> |
                    <a onClick={() => this.deleteAccount(parseInt(this.state.idUser,10))}>Delete Account</a> |                        
                    <a onClick={this.logout}>Logout</a>
                </nav>
            </header>

            <div>
                <h2 className="text-center">Pizza List</h2>
                <div className="row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.pizza.map(
                                    pizza =>
                                        <tr key = {pizza.id}>
                                            <td> {pizza.name} </td>
                                            <td> {pizza.description}</td>
                                            <td> {pizza.price}</td>
                                            <td> <img src= {pizza.image} alt="iamge {{}}" ></img> </td>
                                            <td>
                                            <button onClick = {() => this.choosePizza(pizza.id)} className="btn btn-info">Order</button>
                                        </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
    </div>



        );
    }
}

export default UserPanelComponent;