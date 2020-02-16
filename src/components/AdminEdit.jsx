import React, { Component } from 'react'
import toastr from '../notification/Toastr'

export class AdminEdit extends Component {
  state={
          data:{
              ord:{
                userId: "",
                orderId: "",
                orderStatus:"",
                orderLocation:""
              },
              class:"closed"

          }
  }


handleChange=(e)=>{
  
const dataCopy = { ...this.state.data }
  dataCopy.ord[e.target.classList.value]= e.target.value;
    this.setState({
      data: dataCopy
    })

}


handleSubmitLocation = (e)=>{
  e.preventDefault();

  const { userId, orderId, orderLocation } =  this.state.data.ord;

  if(userId === "" ){
    toastr.warning('USER ID INPUT FIELD IS EMPTY')
  }else if( orderId === ""  ){
    toastr.warning('ORDER ID INPUT FIELD IS EMPTY')
  }else if( orderLocation === "" ) {
    toastr.warning('ORDER LOCATION ID INPUT FIELD IS EMPTY')

  }else{

        const data = {
          userUpdateId: userId,
          toUpdateLotn: orderLocation,
          toUpdateId: orderId
      };

      this.props.handleLocation(data);
      const copyData = {...this.state.data};

        copyData.ord.userId="";
        copyData.ord.orderLocation="";
        copyData.ord.orderId="";

        this.setState({
          data: copyData
        })

    }
}


handleSubmitStatus = (e)=>{
  e.preventDefault();

  const { userId, orderId, orderStatus  } =  this.state.data.ord;

  if(userId === "" ){
    toastr.warning('USER ID INPUT FIELD IS EMPTY')
  }else if( orderId === ""  ){
    toastr.warning('ORDER ID INPUT FIELD IS EMPTY')
  }else if( orderStatus === "" ) {
    toastr.warning('ORDER LOCATION ID INPUT FIELD IS EMPTY')

  }else{


        const data = {
          userUpdateId: userId,
          toUpdateStatus: orderStatus,
          toUpdateId: orderId

      };

      this.props.handleStatus(data);
      const copyData = {...this.state.data};

        copyData.ord.userId="";
        copyData.ord.orderStatus="";
        copyData.ord.orderId="";

        this.setState({
          data: copyData
        })



  }
}





handleClickA=(e)=>{
    if(this.state.data.class === "closed" && e.target.classList.value === 'status_tog'){
      const dataCopy = {...this.state.data};
      dataCopy.class = "open_status";
      this.setState({
          data: dataCopy
      });
    }else if(this.state.data.class === 'open_status' && e.target.classList.value === 'status_tog'){
      const dataCopy = {...this.state.data};
      dataCopy.class = "closed";
      this.setState({
          data: dataCopy
      });
    }else{
      toastr.info('PLEASE CLOSE THE PREVIOUSLY OPENED INPUT FIELD BY CLICKING ON TOG BUTTON AGAIN')
    }
};


handleClickB=(e)=>{
  if(this.state.data.class === 'closed' && e.target.classList.value === 'location_tog'){
    const dataCopy = {...this.state.data};
    dataCopy.class = "open_location";
    this.setState({
        data: dataCopy
    });
  }else if(this.state.data.class === 'open_location' && e.target.classList.value === 'location_tog'){
    const dataCopy = {...this.state.data};
    dataCopy.class = "closed";
    this.setState({
        data: dataCopy
    });
  }else{
    toastr.info('PLEASE CLOSE THE PREVIOUSLY OPENED INPUT FIELD BY CLICKING ON IT AGAIN')
  }


};


 

  render() {
    return (
      <div className="admin_edit">
        <div className="tog_button">
          <button className="status_tog" onClick={this.handleClickA} title="OPEN STATUS EDIT">STATUS EDIT</button>
          <button className="location_tog" onClick={this.handleClickB} title="OPEN LOCATION EDIT">LOCATION EDIT</button>
        </div>
        <form className={"curent_location_form "+ this.state.data.class}  onSubmit={this.handleSubmitLocation}>
          <label htmlFor="user_identity">USER ID</label>
          <input type="text" placeholder="ENTER USER ID " id="user_identity" onChange={this.handleChange} value={this.state.data.ord.userId} className="userId"/>
          <label htmlFor="order_new_location">NEW LOCATION</label>
          <input type="text" placeholder="ENTER THE CURRENT LOCATION " id="order_new_location" onChange={this.handleChange} value={this.state.data.ord.orderLocation} className="orderLocation"/>
          <label htmlFor="order_identity">ORDER ID</label>
          <input type="text" placeholder="ENTER USER ID " id="order_identity" onChange={this.handleChange} value={this.state.data.ord.orderId} className="orderId"/>
          <button type="submit" className="admin_submit">UPDATE </button>
        </form>
        <form action="" className={"status_form "+ this.state.data.class} onSubmit={this.handleSubmitStatus}>
          <label htmlFor="user_ordr_f2">USER ID</label>
          <input type="text" placeholder="ENTER USER ID" onChange={this.handleChange} value={this.state.data.ord.userId} className="userId"/>
          <label htmlFor="order_id_f2">ORDER ID</label>
          <input type="number" placeholder="ENTER ORDER ID" onChange={this.handleChange} value={this.state.data.ord.orderId} className="orderId" />
          <select name="" id="status_option" className="orderStatus" onChange={this.handleChange}>
            <option value="Delivered">Delivered</option>
            <option value="Intransit">Intransit</option>
          </select>
          <button type="submit" className="admin_submit">UPDATE </button>
        </form>
      </div>
    )
  }
}

export default AdminEdit
