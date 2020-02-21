import React, { Component } from 'react'
import toastr from '../notification/Toastr'

class AccEdit extends Component {


  state = {
    data: {
      newVal: "",
      keyToValue: "",
    }
  };

  //CHECK IF STATE IS PORPULATED AND PASS THE DATA UP

  handleClick = () => {
    if (this.state.data.newVal === "") {
      toastr.warning('THE CHANGE INPUT IS EMPTY')

    } else if(this.props.typ === 'phone_number' && parseInt(this.state.data.val) > 2349999999999 || parseInt(this.state.data.val) < 2340000000000 ) {
        toastr.error("INCORRECT PHONE NUMBER FORMAT");
        toastr.info("PLEASE INPUT PHONE NUMBER IN THE RIGHT FORMAT")
    }else{ 

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
    console.log(this.props.typ)
  
    
    let holder;
    let impType;
    switch (this.props.typ) {
      case 'user_name':
      case 'house_address':
        impType = 'text';
        holder="ENTER THE NEW CONTENT";
        
        break;
      case 'password':
        impType = 'password';
        holder="ENTER THE NEW CONTENT";
        
        break;
      case 'phone_number':
        impType = 'number';
        holder="ENTER NO IN FORMAT 2348012345678";
        
        break;
      default:
        impType = 'text';
        holder="ENTER THE NEW CONTENT";
        

    };
    
  
    return (
      <div >
        <h3 className="title">Replace {this.props.typdisplay}</h3>
        <input type={impType} placeholder={holder} value={this.state.data.newVal} className="edit-i"  onChange={this.handleChange} />
        <button type="submit" className="editsub" onClick={this.handleClick}>UPDATE</button>
      </div>
    )
  }
}

export default AccEdit
