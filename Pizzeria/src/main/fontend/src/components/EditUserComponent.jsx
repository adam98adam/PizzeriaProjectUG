import React, { Component } from 'react'
import UserService from '../services/UserService';

class EditUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idAccount: this.props.match.params.idAccount,
            idUser: this.props.match.params.idUser,
            name:'',
            surname:'',
            email:'',
            phonenumber:''


        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePhonenumberHandler = this.changePhonenumberHandler.bind(this);
    }

    componentDidMount() {
        UserService.getUserById(parseInt(this.props.match.params.idUser,10)).then((res) => {
            let user = res.data;
            this.setState({name: user.name,surname: user.surname,email: user.email,phonenumber: user.phonenumber});
        })

    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeSurnameHandler = (event) => {
        this.setState({surname: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    changePhonenumberHandler = (event) => {
        this.setState({phonenumber: event.target.value});
    }





    cancel = (id) => {

        this.props.history.push(`/user/${id}`);
    }

    updateUser = (e) => {
        e.preventDefault();
        let user = {name: this.state.name,surname: this.state.surname,email: this.state.email,phonenumber: this.state.phonenumber}
        console.log(user);
        UserService.updateUser(user,parseInt(this.state.idUser,10)).then((res) => {
            this.cancel(parseInt(this.state.idAccount,10))
        }).catch((error) => console.log(error.response))
 
    }

    render () {
        return (
            <div>
                <div className = "container">
              <div className = "row">
                  <div className = "card col-md-6 offset-md-3 offset-md3">
                      <h3 className="text-center">Update User</h3>
                      <div className = "card-body">
                          <form>
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

                              <button className="btn btn-success" onClick={this.updateUser}>Save</button>
                              <button className="btn btn-danger" onClick={() => this.cancel(parseInt(this.state.idAccount,10))}  style={{marginLeft: "10px"}}>Cancel</button>
                          </form>

                      </div>
                  </div>
              </div>
          </div>
                
            </div>
        )
    }
}

export default EditUserComponent