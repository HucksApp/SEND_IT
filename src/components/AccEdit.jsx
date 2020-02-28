import React, { Component } from 'react'
import toastr from '../notification/Toastr'
import AutocompleteAddress from './AutocompleteAddress'

class AccEdit extends Component {


  state = {
    data: {
      newVal: "",
      keyToValue: "",
    }
  };

  //CHECK IF STATE IS PORPULATED AND PASS THE DATA UP

  handleClick = () => {
    console.log(this.state.data.newVal)
    const newchk = parseInt(this.state.data.val);
    if (this.state.data.newVal === "") {
      toastr.warning('THE CHANGE INPUT IS EMPTY')

    } else if (this.props.typ === 'phone_number') {
      if (newchk > 2349999999999 || newchk < 2340000000000) {
        toastr.warning("INCORRECT PHONE NUMBER FORMAT");
        toastr.info("PLEASE INPUT PHONE NUMBER IN THE RIGHT FORMAT")
      }

    } else {

      this.props.updateState(this.state.data);

      const newData = { ...this.state.data };

      newData.newVal = "";
      newData.keyToValue = "";

      this.setState({
        data: newData
      })
      this.props.handleCloseModal()

    }

  }


  passAddress = ({ address }) => {
    const keyToValue = 'address';
    const val = address;
    const data = {
      val, keyToValue
    }
    this.setState({
      data
    });
  }


  //STORE INPUT IN STATE

  handleChange = (e) => {

    const keyToValue = this.props.typ;
    const val = e.target.value;
    const data = {
      val, keyToValue
    }

    this.setState({
      data
    });
  }


  //DYNAMIC INPUT TYPE VALUE BASED ON PROFILE FIELD TO BE EDITED

  render() {
    console.log(this.props.typ)

    let edit;
    let holder;
    let impType;
    switch (this.props.typ) {
      case 'user_name':
      case 'address':
        impType = 'text';
        holder = "ENTER THE NEW CONTENT";

        break;
      case 'password':
        impType = 'password';
        holder = "ENTER THE NEW CONTENT";

        break;
      case 'phone_number':
        impType = 'number';
        holder = "ENTER NO IN FORMAT 2348012345678";

        break;
      default:
        impType = 'text';
        holder = "ENTER THE NEW CONTENT";


    };

    if (this.props.typ === 'address') {
      edit = (<AutocompleteAddress
        addressType=" NEW CONTENT "
        passAddress={this.passAddress}
      />)
    } else {
      edit = (<input type={impType} placeholder={holder} value={this.state.data.newVal} className="edit-i" onChange={this.handleChange} />)
    }



    return (
      <div >
        <h3 className="title">Replace {this.props.typdisplay}</h3>
        {edit}
        <button type="submit" className="editsub" onClick={this.handleClick}>UPDATE</button>
      </div>
    )
  }
}

export default AccEdit
