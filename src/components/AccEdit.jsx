import React, { Component } from 'react'
import toastr from '../notification/Toastr'

class AccEdit extends Component {


  state = {
    data: {
      newVal: "",
      keyToValue: "",
      limit: "",
    }
  };

  //CHECK IF STATE IS PORPULATED AND PASS THE DATA UP

  handleClick = () => {

    if (this.state.data.newVal === "") {
      toastr.warning('THE CHANGE INPUT IS EMPTY')

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
    let limit;
    let impType;
    switch (this.props.typ) {
      case 'user-name':
      case 'house-address':
        impType = 'text';
        break;
      case 'password':
        impType = 'password';
        break;
      case 'phone-number':
        impType = 'number';
        limit = '13';
        break;
      default:
        impType = 'text';

    };

    return (
      <div >
        <h3 className="title">Replace {this.props.typdisplay}</h3>
        <input type={impType} placeholder="ENTER THE NEW CONTENT" value={this.state.data.newVal} className="edit-i" minLength={this.state.data.limit} maxLength={this.state.data.limit} onChange={this.handleChange} />
        <button type="submit" className="editsub" onClick={this.handleClick}>UPDATE</button>
      </div>
    )
  }
}

export default AccEdit
