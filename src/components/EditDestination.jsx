import React, { Component } from 'react'
import AutocompleteAddress from './AutocompleteAddress'


export class EditDestination extends Component {

  state = {
    data: {
      orderUpdate: {
        upDestnAddress: "",
        ordId: ""
      }
    }
  }


  // STORE INPUT 
  handleChange = (e) => {
    const copyData = { ...this.state.data };
    copyData.orderUpdate[e.target.id] = e.target.value;
    this.setState({
      data: copyData
    })

  }


// STORE AUTOCOMPLETE ADDRESS IN STATE
  passAddress = ({ address }) => {
    const copyData = { ...this.state.data };
    copyData.orderUpdate.upDestnAddress = address;
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
          <h3>EDIT DESTINATION</h3>
          <div>
            <label htmlFor="upDestnAddress">NEW DESTINATION:</label>
            <AutocompleteAddress
              addressType=" NEW DESTINATION ADDRESS "
              passAddress={this.passAddress}

            />
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
