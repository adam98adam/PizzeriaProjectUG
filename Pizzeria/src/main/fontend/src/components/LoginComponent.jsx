import React, { Component } from 'react';

class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login:'',
            password:''
        }
    }


    loginToSystem = (e) => {
        e.preventDefault();
        let userLoginAndPassword = {login: this.state.login,passowrd: this.state.password}
        console.log('userLoginAndPassword => ' + JSON.stringify(userLoginAndPassword));
    }

    changeLoginHandler = (event) => {
        this.setState({login: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value})
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
                                        <input placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.loginToSystem}>Login</button>  

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default LoginComponent;