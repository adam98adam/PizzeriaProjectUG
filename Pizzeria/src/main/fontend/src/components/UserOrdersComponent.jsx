import React, { Component } from 'react'
import OrdersService from '../services/OrdersService';

class UserOrdersComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idAccount: this.props.match.params.idAccount,
            idUser: this.props.match.params.idUser,
            orders:[]

        }

    }

    componentDidMount(){
        OrdersService.getOrdersByUserId(this.props.match.params.idUser).then((res) => {
            this.setState({orders: res.data});
        })
    }

    logout = () => {
        this.props.history.push("/");
    }

    getBackToUserPanel = (id) => {
        this.props.history.push(`/user/${id}`)
    }



    render () {
        return (
            <div>
                <header>
                <nav>
                    <a>Pizza</a> |
                    <a onClick={this.logout}>Logout</a>
                </nav>
            </header>
                <h2 className="text-center">My Orders</h2>
                <div className="row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Pizza</th>
                                <th>Bakestyle</th>
                                <th>Drink</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.orders.map(
                                    order =>
                                    <tr key = {order.id}>
                                        <td> {order.pizza.name} </td>
                                        <td> {order.bakestyle.name}</td>
                                        <td> {order.drink.name}</td>                  
                                    </tr>
                                )
            
                            }
                        </tbody>
                    </table>
                </div>
                <div display="flex" justify-content="center">
                    <button onClick = {() => this.getBackToUserPanel(parseInt(this.state.idAccount,10))} className="btn btn-info">Back to user panel</button>
                </div>
                
            </div>
        )
    }
}

export default UserOrdersComponent