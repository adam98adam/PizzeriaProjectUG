import React, { Component } from 'react';
import AddressService from '../services/AddressService';

class EditAddressComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idAccount: this.props.match.params.idAccount,
            idAddress: this.props.match.params.idAddress,
            city:'',
            street:'',
            number: 0

        }
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeStreetHandler = this.changeStreetHandler.bind(this);
        this.changeNumberHandler = this.changeNumberHandler.bind(this);
    }
     
    componentDidMount() {
        AddressService.getAddressById(parseInt(this.props.match.params.idAddress,10)).then((res) => {
            let address = res.data;
            this.setState({city: address.city,street: address.street,number: address.number});
        })

    }

    changeCityHandler = (event) => {
        this.setState({city: event.target.value});
    }

    changeStreetHandler = (event) => {
        this.setState({street: event.target.value});
    }

    changeNumberHandler = (event) => {
        this.setState({number: event.target.value});
    }



    cancel = (id) => { 
        this.props.history.push(`/user/${id}`);
    }

    updateAddress = (e) => {
        e.preventDefault();
        let address = {city: this.state.city,street: this.state.street,number: this.state.number}
        AddressService.updateAddress(address,parseInt(this.state.idAddress,10)).then((res) => {
            this.cancel(parseInt(this.state.idAccount,10))
        }).catch((error) => console.log(error.response))
 
    }



    render() {
        return (
            <div>
                <div className = "container">
              <div className = "row">
                  <div className = "card col-md-6 offset-md-3 offset-md3">
                      <h3 className="text-center">Update Address</h3>
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
                                  <input placeholder="Number" name="street" className="form-control" value={this.state.number} onChange={this.changeNumberHandler}/>
                              </div>
                              <button className="btn btn-success" onClick={this.updateAddress}>Save</button>
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

export default EditAddressComponent;