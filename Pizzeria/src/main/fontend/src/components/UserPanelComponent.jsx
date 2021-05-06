import React, { Component } from 'react';
import AccountService from '../services/AccountService';
import AddressService from '../services/AddressService';
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

    logout = () => {
        this.props.history.push("/");
    }



    
    render() {
        return (
            <header>
                <nav>
                    <a>Pizza</a> |
                    <a onClick={() => this.account(parseInt(this.state.idAccount,10))}>Account</a> |
                    <a onClick={() => this.user(parseInt(this.state.idAccount,10),parseInt(this.state.idUser,10))}>User</a> |
                    <a onClick={() => this.address(parseInt(this.state.idAccount,10),parseInt(this.state.idAddress,10))}>Address</a> |
                    <a onClick={() => this.deleteAccount(parseInt(this.state.idUser,10))}>Delete Account</a> |                        
                    <a onClick={this.logout}>Logout</a>
                </nav>
            </header>

        );
    }
}

export default UserPanelComponent;