import React, { Component } from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import toastr from '../notification/Toastr'

export class CreateOrder extends Component {

// INITIALIZE
constructor(props){
  super(props);


  this.state = {
    data: {
      order: {
        receiverName: "",
        destinationAddress: "",
        pickupAddress: "",
        receiverPhoneNumber: "",
        description: "",
        date: ""
      },
      empty:""
    }
  }


  this.emptyDes = React.createRef();
  this.emptyPic = React.createRef();
  this.handleChange = this.handleChange.bind(this);
  this.passAddress = this.passAddress.bind(this)

}


// STORE INPUT
  handleChange = (e) => {
    const newData = { ...this.state.data };
    newData.order[e.target.id] = e.target.value;
    this.setState({
      data: newData
    })

  }


//STORE THE AUTO ADDRESS
  passAddress = ({ address, addressTyp }) => {
    const dataCopy = { ...this.state.data }
    dataCopy.empty = address;
    switch (addressTyp) {
      case 'destination':
        dataCopy.order.destinationAddress = address;
        this.setState({ data: dataCopy })
        break;
      case 'pickup':
        dataCopy.order.pickupAddress = address;
        this.setState({ data: dataCopy });
        break;
      default:
        return
    }

  }


  //HANDLE THE NEW ORDER FORM
  //---PASS THE INPUT DATA STORED IN STATE UP
  //---EMPTY THE ORDER FORM

  handleCreate = (e) => {
    e.preventDefault();

    if (this.state.data.order.receiverName === "") {
      toastr.error('RECEIVERS NAME IS EMPTY')
    } else if (this.state.data.order.destinationAddress === "") {
      toastr.error('DESTINATION ADDRESS IS EMPTY')
    } else if (this.state.data.order.pickupAddress === "") {
      toastr.error('PICK UP ADDRESS IS EMPTY')
    } else if (this.state.data.order.description === "") {
      toastr.error('ORDER DESCRIPTION IS EMPTY')
    } else if (this.state.data.order.receiverPhoneNumber === "") {
      toastr.error('RECEIVERS PHONE NUMBER IS EMPTY')
    } else {

      this.props.updateOrder(this.state.data.order);

      const newCopy = { ...this.state.data }
      newCopy.order.receiverName = "";
      newCopy.order.destinationAddress = "";
      newCopy.order.pickupAddress = "";
      newCopy.order.description = "";
      newCopy.order.receiverPhoneNumber = "";
      this.emptyDes.current.state.data.address = "";
      this.emptyPic.current.state.data.address = "";
  
      this.setState({
        data: newCopy
      });

    }
  }

  render() {

    return (
      <div className={'new_order ' + this.props.show} >
        <form className="create-order" onSubmit={this.handleCreate} >
          <h3>NEW ORDER PLACEMENT</h3>
          <div>
            <label htmlFor="receiverName">RECEIVERS NAME:</label>
            <input id="receiverName" type="text" onChange={this.handleChange} value={this.state.data.order.receiverName} placeholder="ENTER THE RECEIVERS NAME" required />
          </div>
          <div>
            <label htmlFor="destinationAddress" >DESTINATION:</label>
            <AutocompleteAddress
              
              addressType=" DESTINATION "
              addressTyp="destination"
              passAddress={this.passAddress}
              ref = {this.emptyDes}
            />
          </div>
          <div>
            <label htmlFor="pickupAddress" >PICKUP:</label>
            <AutocompleteAddress
              addressType=" PICKUP "
              addressTyp="pickup "
              passAddress={this.passAddress}
              ref = {this.emptyPic}
            />
          </div>
          <div>
            <label htmlFor="description" >ORDER DESCRIPTION:</label>
            <input id="description" type="text" onChange={this.handleChange} value={this.state.data.order.description} placeholder="DESCRIPTION OF CONTENT" required />
          </div>
          <div>
            <label htmlFor="receiverPhoneNumber" >RECEIVER PHONE:</label>
            <input id="receiverPhoneNumber" type="number" onChange={this.handleChange} value={this.state.data.order.receiverPhoneNumber} placeholder="RECEIVERS NO IN 2348034567863" min="2340000000000" max="2349999999999" required />
          </div>
          <button type="submit" title="SUBMIT">CREATE</button>
        </form>
      </div>
    )
  }
}

export default CreateOrder
