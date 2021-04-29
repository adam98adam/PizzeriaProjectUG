import React, { Component } from 'react';
import LoginService from '../services/LoginService';
import Popup from 'reactjs-popup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loginStatus: true,
            login:'',
            password:''
        }

        this.loginToSystem = this.loginToSystem.bind(this);
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.popUp = this.popUp.bind(this);
    }


    loginToSystem = (e) => {
        e.preventDefault();
        LoginService.getAccount(this.state.login,this.state.password)
        .then((res) => {
            console.log(res.data)
        })
        .catch((er) => {
            {this.changeLoginStatus()}
        })
    }
    
    popUp = () => {
        return(
           
                    <p>I'm A Pop Up!!!</p>
          
         
        )

    }


    changeLoginStatus = () => {
        this.setState({loginStatus: !this.state.loginStatus})
    }

    changeLoginHandler = (event) => {
        this.setState({login: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }




    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md3">
                            <h3 className="text-center">Login</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Login : </label>
                                        <input placeholder="Login" name="login" className="form-control" value={this.state.login} onChange={this.changeLoginHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Password : </label>
                                        <input type="password" placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.loginToSystem}>Login</button>  

                                </form>
                                {!this.state.loginStatus ? this.popUp() : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;