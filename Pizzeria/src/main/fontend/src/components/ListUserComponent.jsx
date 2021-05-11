import React, { Component } from 'react';
import UserService from '../services/UserService';


class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users:[]
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.login = this.login.bind(this).bind(this);
    }
    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({users: res.data});
        })
    }

    addUser() {
        this.props.history.push('/add-user');
    }

    editUser(id){
        this.props.history.push(`/update-user/${id}`);
    }

    deleteUser(id) {
        UserService.deleteUser(id).then((res) => {
            this.setState({users: this.state.users.filter(user => user.id !==id)});
        });
    }

    login(){
        this.props.history.push(`/login/`);
    }



    render() {
        return (
            <div>
                <h2 className="text-center">Or List</h2>
                <div className="btn btn-primary" onClick={this.addUser}>Add User</div>
                <div style={{marginLeft: "10px"}} className="btn btn-primary" onClick={this.login}>Login</div>
                <div className="row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Phonenumber</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                    <tr key = {user.id}>
                                        <td> {user.name} </td>
                                        <td> {user.surname}</td>
                                        <td> {user.email}</td>
                                        <td> {user.phonenumber} </td>
                                        <td>
                                            <button onClick = {() => this.editUser(user.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick = {() => this.deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
            
                            }
                        </tbody>
                    </table>

                </div>
                
            </div>
        );
    }
}

export default ListUserComponent;