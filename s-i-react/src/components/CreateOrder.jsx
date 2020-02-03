import React, { Component } from 'react'

export class CreateOrder extends Component {


state={
        data:{
            order:{
            receiverName: "",
            destinationAddress: "",
            pickupAddress: "",
            receiverPhoneNumber: "",
            date: ""
            }
        }
}


handleChange=(e)=>{
    const newData ={...this.state.data};
    newData.order[e.target.id] = e.target.value;
    this.setState({
        data: newData
    })
console.log(this.state)

}


handleCreate=(e)=>{
    e.preventDefault();

    this.props.updateOrder(this.state.data.order);

    const newCopy = {...this.state.data}
    newCopy.order.receiverName="";
    newCopy.order.destinationAddress="";
    newCopy.order.pickupAddress="";
    newCopy.order.receiverPhoneNumber="";
    this.setState({
        data: newCopy
     });

    
}

  render() {
    return (
      <div className={'new_order '+ this.props.show} >
       <form className="create-order" onSubmit={this.handleCreate} >
              <div>
              <h3>NEW ORDER PLACEMENT</h3>
              <label htmlFor="receiverName">RECEIVERS NAME:</label>
              <input id="receiverName" type="text" onChange={this.handleChange} value={this.state.data.order.receiverName} placeholder="ENTER THE RECEIVERS NAME" required/>
              </div>
              <div>
              <label htmlFor="destinationAddress" >DESTINATION ADDRESS:</label>
              <input id="destinationAddress" type="text" onChange={this.handleChange} value={this.state.data.order.destinationAddress} placeholder="ENTER THE DESTINATION ADDRESS" required />
              </div>
              <div>
              <label htmlFor="pickupAddress" >PICKUP ADDRESS:</label>
              <input id="pickupAddress" type="text" onChange={this.handleChange} value={this.state.data.order.pickupAddress} placeholder="ENTER THE PICKUP ADDRESS" required />
              </div>
              <div>
              <label htmlFor="receiverPhoneNumber" >RECEIVER PHONE NUMBER:</label>
              <input id="receiverPhoneNumber" type="number" onChange={this.handleChange} value={this.state.data.order.receiverPhoneNumber} placeholder="ENTER THE RECEIVER PHONE NUMBER" required />
              </div>
              <button  type="submit" title="SUBMIT">CREATE</button>
          </form>
      </div>
    )
  }
}

export default CreateOrder
