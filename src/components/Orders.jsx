import React, { Component } from 'react';
import toastr from '../notification/Toastr'

//COMPONENTS
import Order from './Order';
import EditDestination from './EditDestination';
import CreateOrder from './CreateOrder';

export class Orders extends Component {

state = { 
    data:{
        orderList:[],
        showEdit:"close",
        showCreate:"close"


    },
};



componentDidMount(){
const token = sessionStorage.getItem('token');
if(!token){
    toastr.warning("YOU ARE NOT LOGGED IN");
    this.props.history.push('/login');

}else if(token){

    fetch('https://s-i-api.herokuapp.com/api/v1/order',{

        headers:{
            Authorization: token
        }

    }).then(res=>{return res.json()})
    .then(data=>{
        if(data.length === 0){

            toastr.info('YOUR ORDERS LISTS IS STILL EMPTY')

        }else {

            const newData = {...this.state.data};
            newData.orderList = data;
            this.setState({
                data: newData
            });

            console.log(this.state)

        }
       
    }).catch(err=>toastr.error('THERE WAS AN ERROR GETTING THE PROFILE ORDERS'))


}


};

handleDeleteUpdate=(list, del)=>{

    const deldataCopy = {...this.state.data};
    deldataCopy.orderList = list;

    this.setState({
        data: deldataCopy
    });
const token = sessionStorage.getItem('token');

    fetch('https://s-i-api.herokuapp.com/api/v1/delete_order/'+del,{
        method:"DELETE",
        headers:{
        Authorization: token
        }
            }).then(res=>{
                console.log(res)
                toastr.info('YOU HAVE DELETED ORDER '+ del)
            }).catch(err=>toastr.error('THERE WAS AN ERROR DELETING ORDER '+ del))

}


handleDestinationUpdate=({upDestnAddress,ordId})=>{
const copyData = {...this.state.data};
    const newList = copyData.orderList.map(order=>{
    if (order.order_id === parseInt(ordId)){
        order.destination_address = upDestnAddress;
            return order
    }else{
            return order;
    }
    });

    copyData.orderList= newList;
    this.setState({
        data: copyData
    })
    const token = sessionStorage.getItem('token');

    fetch('https://s-i-api.herokuapp.com/api/v1/update_destination',{
                        method:"PUT",
                        headers:{
                            "Content-Type":"application/json",
                            Authorization: token
                        },
                        body:JSON.stringify({upDestnAddress, ordId})
        })
        .then(res=>{
                toastr.info('YOU JUST UPDATED DESTINATION ADDRESS OF ORDER  '+ ordId)

        }).catch(err=>toastr.error('THERE WAS AN ERROR UPDATING ORDER '+ ordId))



}



handleUpdateOrder=(data)=>{
    let date = Date.now();
    let dateObj= new Date(date);
   let day = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    let dateString = year + "-" + month +"-" + day+ "Taaaa ";
    let id
    if(this.state.data.orderList.length !== 0){
         id = this.state.data.orderList[this.state.data.orderList.length - 1].order_id + 1 ;
    }else{
        id= 1
    }


    const dataCopy = {...this.state.data};
    console.log(data.date);
    data.date= dateString;
    const newOrder = {
                order_id: id,
                receiver_name: data.receiverName,
                receiver_phone_no: data.receiverPhoneNumber,
                pickup_address: data.pickupAddress,
                destination_address: data.destinationAddress,
                order_date: data.date,
                c_location:'Newly Processed',
                status:'InTransit'
    };

    const newList = [...dataCopy.orderList]
                    newList.push(newOrder)
                dataCopy.orderList = newList;

    console.log(dataCopy)
    this.setState({
            data: dataCopy
    })
    const token = sessionStorage.getItem('token');
    
        data.date = date;
        fetch('https://s-i-api.herokuapp.com/api/v1/new_order',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization: token
            },
            body:JSON.stringify(data)
        })
            .then(res=>{
                console.log(res)
                toastr.success("NEW ORDER ADDED TO ORDER LIST")
            }).catch(err=>toastr.error('THERE WAS AN ERROR CREATING A NEW ORDER '))


}







handleClickCreate=()=>{

    const newData = {...this.state.data};
    if(newData.showCreate === "close"){
    newData.showCreate="open";
    this.setState({
        data: newData
    });
}else if(newData.showCreate === "open"){
    newData.showCreate ="close";
    this.setState({
        data: newData
    });
}

}






handleClickEdit=()=>{

    const newData = {...this.state.data};
    if(newData.showEdit === "close"){
    newData.showEdit="open";
    this.setState({
        data: newData
    });
}else if(newData.showEdit === "open"){
    newData.showEdit="close";
    this.setState({
        data: newData
    });
}

}



  render() {
    return (
      <div className="orders">
            <h3 className="orders-title">LIST OF ORDERS AND DELIVERY DETAILS</h3>
            <Order orderList={this.state.data.orderList}  handleDeleteUpdate={this.handleDeleteUpdate} />
            <button onClick={this.handleClickEdit} >EDIT DESTINATION</button>
            <button  onClick={this.handleClickCreate}>CREATE ORDER</button>
            <EditDestination  show={this.state.data.showEdit} handleDestinationUpdate={this.handleDestinationUpdate}/>
            <CreateOrder show={this.state.data.showCreate} updateOrder={this.handleUpdateOrder} />
        
            
      </div>
    )
  }
}

export default Orders;