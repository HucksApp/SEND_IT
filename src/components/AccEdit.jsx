import React, { Component } from 'react'
import toastr from '../notification/Toastr'

 class AccEdit extends Component {


  state = {
          data:{
            newVal:"",
            keyToValue:""
          }
  };



handleClick=()=>{

  if(this.state.data.newVal === ""){
    toastr.warning('THE CHANGE INPUT IS EMPTY')

  }else{

  console.log(this.state.data)
this.props.updateState(this.state.data);

const newData = {...this.state.data};

newData.newVal="";
newData.keyToValue="";

this.setState({
    data: newData
})

console.log(this.state)

  }

}




handleChange=(e)=>{
 
const keyToValue = this.props.typ;
const val = e.target.value;
const data= {
      val, keyToValue
}

this.setState({
          data
});
console.log(this.state)
}


  render() {
    let impType;
    switch(this.props.typ){
        case 'user-name':
        case 'house-address':
          impType='text';
          break;
        case 'password':
          impType= 'password';
          break;
        case 'phone-number':
          impType= 'number'
        break;
        default:
          impType='text';

    };

    return (
      <div >
    <h3 className="title">Replace {this.props.typ}</h3>
      <input type={impType} placeholder="ENTER THE NEW CONTENT" value={this.state.data.newVal} className="edit-i" onChange={this.handleChange}/>
      <button type="submit" className="editsub" onClick={this.handleClick}>UPDATE</button>
      </div>
    )
  }
}

export default AccEdit
