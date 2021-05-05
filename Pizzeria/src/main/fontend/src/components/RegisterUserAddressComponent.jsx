import React, { Component } from 'react';
import AddressService from '../services/AddressService';

class RegisterUserAddressComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city:'',
            street:'',
            number:'',
            userId: this.props.match.params.id
            

        }
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeStreetHandler = this.changeStreetHandler.bind(this);
        this.changeNumberHandler = this.changeNumberHandler.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
    }

    saveAddress = (e) => {
        e.preventDefault();
        let address = {city: this.state.city,street: this.state.street,number: this.state.number,user: { id: parseInt(this.state.userId, 10)}}
        console.log('address => ' + JSON.stringify(address));
        AddressService.createAddress(address).then(res => {
            console.log(res.data)
            this.props.history.push('/');
        })
    }


    changeCityHandler= (event) => {
        this.setState({city: event.target.value});
    }

    changeStreetHandler = (event) => {
        this.setState({street: event.target.value});
    }

    changeNumberHandler = (event) => {
        this.setState({number: event.target.value})
    }

    render() {
        return (
            <div>
                 <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md3">
                            <h3 className="text-center"> Add User Address</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> City : </label>
                                        <input placeholder="City" name="city" className="form-control" value={this.state.city} onChange={this.changeCityHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Street : </label>
                                        <input placeholder="Street" name="street" className="form-control" value={this.state.street} onChange={this.changeStreetHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Number : </label>
                                        <input placeholder="Number" name="number" className="form-control" value={this.state.number} onChange={this.changeNumberHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveAddress}>Save</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default RegisterUserAddressComponent;