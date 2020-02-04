import React, { Component } from 'react'
import toastr from '../notification/Toastr' 


//COMPONENTS
import AdminOrdersList from './AdminOrdersList';
import AdminEdit from './AdminEdit';


//STYLES
import '../styles/AdminComp.css'

class AdminComp extends Component {

    state = { 
        data:{
            togCtrl:"",
            orderList:[]
    
        }
    }


handleLocation = (data)=>{
console.log(data)

        const dataCopy = {...this.state.data};
        const newList = dataCopy.orderList.map(order=>{
            if (order.user_email === data.userUpdateId && order.order_id === parseInt(data.toUpdateId)){
                order.c_location = data.toUpdateLotn
                return order
            }else{
                return order
            };
        });

        console.log(newList)

       dataCopy.orderList = newList;

        this.setState({
            data: dataCopy
        })
    

const adminToken = sessionStorage.getItem('adminToken');

    fetch('https://s-i-api.herokuapp.com/api/v1/update_location',{
        method:'PUT',
        headers:{
            "Content-Type":"application/json",
            Authorization: adminToken
        },
        body:JSON.stringify(data)
    }).then((response)=>{
    console.log(response);
    toastr.success(`ORDER ${data.toUpdateId} BY USER ${data.userUpdateId}, LOCATION WAS UPDATED TO ${data.toUpdateLotn}`)
    })
}

handleStatus = (data)=>{
    console.log(data)

    const dataCopy = {...this.state.data};
    const newList = dataCopy.orderList.map(order=>{
        if (order.user_email === data.userUpdateId && order.order_id === parseInt(data.toUpdateId)){
            order.status = data.toUpdateStatus
            return order
        }else{
            return order
        };
    });

    console.log(newList)

   dataCopy.orderList = newList;

    this.setState({
        data: dataCopy
    });
    const adminToken = sessionStorage.getItem('adminToken');

    fetch('https://s-i-api.herokuapp.com/api/v1/update_status',{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",
                    Authorization: adminToken
                },
                body:JSON.stringify(data)
    }).then((response)=>{
        console.log(response);
        toastr.success(`ORDER ${data.toUpdateId} BY USER ${data.userUpdateId}, STATUS WAS UPDATED TO ${data.toUpdateStatus}`)
    });


}


   
componentDidMount(){

    const adminToken = sessionStorage.getItem('adminToken');

    if(!adminToken){
        toastr.warning("CAN'T FIND ADMIN CREDENTIALS !!!");
        this.props.history.push('/login')
    }else {

    fetch('https://s-i-api.herokuapp.com/api/v1/admin_orders',{
        headers:{
            Authorization: adminToken
        }

    })
        .then(res=>{
        return res.json();
    })
        .then(data=>{
            const datacopy={...this.state.data};
                datacopy.orderList=data;
                this.setState({
                    data: datacopy
                })
            console.log(this.state)
        })
        .catch(err=>{toastr.error('ERROR FETCHING THE ORDERS LISTS')})
};
}

  render() {

        if(this.state.data.orderList.length !== 0 ){

    return (
      <div className="admin_comp">
          <h4 className="all_orders_title">
              ALL ORDERS LIST WITH CORRESPONDING USER
          </h4>
            <AdminOrdersList orders_list={this.state.data.orderList} />
            <AdminEdit handleLocation={this.handleLocation} handleStatus={this.handleStatus} />
      </div>
    )
        }else{


            return (
                   <div className="admin_comp" >
                       <h4 className="all_orders_title" style={{color: '#fff'}}>
                           FETCHING  ALL ORDERS ...........
                       </h4>
                   </div>
            )
        }
  }
  
}

export default AdminComp
