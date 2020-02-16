import React, { Component } from 'react'



export class EditDestination extends Component {

  state = {
    data: {
      orderUpdate: {
        upDestnAddress: "",
        ordId: ""
      }
    }
  }


  //SAVE INPUT IN STATE

  handleChange = (e) => {
    const copyData = { ...this.state.data };
    copyData.orderUpdate[e.target.id] = e.target.value;
    this.setState({
      data: copyData
    })

  }

  //HANDLE SUBMIT FOR DESTINATION EDIT FIELD
  //----SEND THE DATA UP
  //---EMPTY THE STATE AND FORM

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.handleDestinationUpdate(this.state.data.orderUpdate);
    const dataCopy = { ...this.state.data };
    dataCopy.orderUpdate.upDestnAddress = "";
    dataCopy.orderUpdate.ordId = "";

    this.setState({
      data: dataCopy
    })

    this.props.handleShowModal();



  }

  render() {
    return (
      <div className={'edit-destination ' + this.props.show}>
        <form className="order-edit" onSubmit={this.handleSubmit} >
          <div>
            <h3>EDIT DESTINATION</h3>
            <label htmlFor="upDestnAddress">NEW DESTINATION:</label>
            <input id="upDestnAddress" type="text" onChange={this.handleChange} value={this.state.data.orderUpdate.upDestnAddress} placeholder="ENTER NEW DESTINATION ADDRESS" required />
          </div>
          <div>
            <label htmlFor="ordId" >ORDER:</label>
            <input id="ordId" type="number" onChange={this.handleChange} value={this.state.data.orderUpdate.ordId} placeholder="ENTER ORDER ID" required />
          </div>
          <button type="submit" title="SUBMIT">UPDATE</button>
        </form>
      </div>
    )
  }
}

export default EditDestination 
