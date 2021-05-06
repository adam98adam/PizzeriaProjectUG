import React, { Component } from 'react';
import AccountService from '../services/AccountService';
import UserService from '../services/UserService';

class EditAccountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idAccount: this.props.match.params.idAccount,
            login:'',
            password:'',

        }
        this.changeLoginHandler = this.changeLoginHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    componentDidMount() {
        AccountService.getAccountById(parseInt(this.props.match.params.idAccount,10)).then((res) => {
            let account = res.data;
            this.setState({login: account.login,password: account.password});
        })

    }

    changeLoginHandler = (event) => {
        this.setState({login: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    cancel = (id) => { 
        this.props.history.push(`/user/${id}`);
    }

    updateAccount = (e) => {
        e.preventDefault();
        let account = {login: this.state.login,password: this.state.password}
        AccountService.updateAccount(account,parseInt(this.state.idAccount,10)).then((res) => {
            this.cancel(parseInt(this.state.idAccount,10))
        }).catch((error) => console.log(error.response))
 
    }


    render() {
        return (
          <div>
          <div className = "container">
              <div className = "row">
                  <div className = "card col-md-6 offset-md-3 offset-md3">
                      <h3 className="text-center">Update Acccount</h3>
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
                              <button className="btn btn-success" onClick={this.updateAccount}>Save</button>
                              <button className="btn btn-danger" onClick={() => this.cancel(parseInt(this.state.idAccount,10))}  style={{marginLeft: "10px"}}>Cancel</button>
                          </form>

                      </div>
                  </div>
              </div>
          </div>
      </div>
        );
    }
}

export default EditAccountComponent;