import React, { Component } from 'react'

export class CreateOrder extends Component {

  state = {
    data: {
      order: {
        receiverName: "",
        destinationAddress: "",
        pickupAddress: "",
        receiverPhoneNumber: "",
        description: "",
        date: ""
      }
    }
  }

  // STORE INPUT IN STATE

  handleChange = (e) => {
    const newData = { ...this.state.data };
    newData.order[e.target.id] = e.target.value;
    this.setState({
      data: newData
    })

  }

  //HANDLE THE NEW ORDER FORM
  //---PASS THE INPUT DATA STORED IN STATE UP
  //---EMPTY THE ORDER FORM

  handleCreate = (e) => {
    e.preventDefault();
    this.props.updateOrder(this.state.data.order);

    const newCopy = { ...this.state.data }
    newCopy.order.receiverName = "";
    newCopy.order.destinationAddress = "";
    newCopy.order.pickupAddress = "";
    newCopy.order.description = "";
    newCopy.order.receiverPhoneNumber = "";
    this.setState({
      data: newCopy
    });


  }

  render() {
    return (
      <div className={'new_order ' + this.props.show} >
        <form className="create-order" onSubmit={this.handleCreate} >
        <h3>NEW ORDER PLACEMENT</h3>
          <div>
            <label htmlFor="receiverName">RECEIVERS NAME<sup style={{color:'#f00'}}>*</sup>:</label>
            <input id="receiverName" type="text" onChange={this.handleChange} value={this.state.data.order.receiverName} placeholder="ENTER THE RECEIVERS NAME" required />
          </div>
          <div>
            <label htmlFor="destinationAddress" >DESTINATION<sup style={{color:'#f00'}}>*</sup>:</label>
            <input id="destinationAddress" type="text" onChange={this.handleChange} value={this.state.data.order.destinationAddress} placeholder="ENTER THE DESTINATION ADDRESS" required />
          </div>
          <div>
            <label htmlFor="pickupAddress" >PICKUP<sup style={{color:'#f00'}}>*</sup>:</label>
            <input id="pickupAddress" type="text" onChange={this.handleChange} value={this.state.data.order.pickupAddress} placeholder="ENTER THE PICKUP ADDRESS" required />
          </div>
          <div>
            <label htmlFor="description" >DESCRIPTION<sup style={{color:'#f00'}}>*</sup>:</label>
            <input id="description" type="text" onChange={this.handleChange} value={this.state.data.order.description} placeholder="PLEASE ENTER DESCRIPTION IN.. WEIGHT,CONTENT,TYPE" required />
          </div>
          <div>
            <label htmlFor="receiverPhoneNumber" >RECEIVER PHONE<sup style={{color:'#f00'}}>*</sup>:</label>
            <input id="receiverPhoneNumber" type="tel" onChange={this.handleChange} value={this.state.data.order.receiverPhoneNumber} placeholder="ENTER THE RECEIVER PHONE NO IN FORMAT 2349012345678" pattern="[2-4]{3}[0-9]{10}" required />
          </div>
          <button type="submit" title="SUBMIT">CREATE</button>
        </form>
      </div>
    )
  }
}

export default CreateOrder
