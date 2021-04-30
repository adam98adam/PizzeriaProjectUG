import React, { Component } from 'react';
import UserService from '../services/UserService';
import AccountService from '../services/AccountService';

class RegisterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            registerStatus: true,
            login:'',
            password:'',
            name:'',
            surname:'',
            email:'',
            phonenumber:''
        }


       // this.registerToSystem = this.registerToSystem.bind(this)

    }

    
    registerToSystem = (e) => {
        e.preventDefault();
        let user = {name: this.state.name,surname: this.state.surname,email: this.state.email,phonenumber: this.state.phonenumber,customer : true}
        UserService.createUser(user).then((res) => {
            AccountService.createAccount({login: this.state.login,password: this.state.password,user: {id: parseInt(res.data.id,10)}}).then((res) => {
                console.log(res.data)
            }).catch((error) => {
                UserService.deleteUser(res.data.id).then((res) => console.log(res.data))
                console.log(error.response)

            })
        }).catch((error) => console.log(error.response))
    }
    
    /*
    registerToSystem = (e) => {
        e.preventDefault();
        let user = {name: this.state.name,surname: this.state.surname,email: this.state.email,phonenumber: this.state.phonenumber,customer : true}
        RegisterService.createUser(user).then((res) => console.log(res.data)).catch((error) => console.log("Error"))
    }
    */
    




    cancel = () => {
        this.props.history.push("/");
    }

    changeLoginHandler = (event) => {
        this.setState({login: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeSurnameHandler = (event) => {
        this.setState({surname: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value})
    }

    changePhonenumberHandler = (event) => {
        this.setState({phonenumber: event.target.value})
    }



    render() {
        return (
              <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md3">
                            <h3 className="text-center">Registration</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Login : </label>
                                        <input  placeholder="Login" name="login" className="form-control" value={this.state.login} onChange={this.changeLoginHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Password : </label>
                                        <input placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Name : </label>
                                        <input placeholder="Name" name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Surname : </label>
                                        <input placeholder="Surname" name="surname" className="form-control" value={this.state.surname} onChange={this.changeSurnameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Email : </label>
                                        <input placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Phonenumber : </label>
                                        <input placeholder="Phonenumber" name="phonenumber" className="form-control" value={this.state.phonenumber} onChange={this.changePhonenumberHandler}/>
                                    </div>
                                    <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                                        <button className="btn btn-success" onClick={this.registerToSystem}>Register</button>
                                        <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>  
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

export default RegisterComponent;