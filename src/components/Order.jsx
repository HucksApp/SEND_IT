import React from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransitionGroup ,CSSTransition} from 'react-transition-group'



// STYLES

import '../styles/Order.css'



const Order = (props) => {
let orders;
let title;

const handleDeleteOrder=(e)=>{

const del = e.target.classList.value.split(" ")[1]
const chk = window.confirm('ARE YOU SURE YOU WANT TO DELETE ORDER '+del)
    if (chk===false){
        return
    }else if (chk === true){
  const newList= props.orderList.filter(order=>{
                    return order.order_id !== parseInt(del);

    });
    props.handleDeleteUpdate(newList, del);
}

};

 


  if ( props.orderList.length === 0 ){
    title =( 
        <h6> PLEASE TAP ON THE CREATE ORDER BUTTON TO START A NEW ORDER</h6>
        );
     orders=(
        <h4 className="empty_list">YOU HAVE NO ORDER LIST </h4>
    )
  }else {
      title =( 
          <div className="head_cover">
                <p className="head">KEYS</p>
            <div className="headings">
                <p className="order_idh">ORDER ID</p>
                <p className="receiver_nameh">RECEIVERS NAME</p>
                <p className="receiver_phone_noh">RECEIVERS PHONE NO</p>
                <p className="pickup_addressh"  >PICKUP ADDRESS</p>
                <p className="destination_addressh">DESTINATION ADDRESS</p>
                <p className="order_dateh">ORDER DATE</p>
                <p className="descriptionh">DESCRIPTION</p>
                <p className="statush">STATUS</p>
                <p className="c_locationh">CURRENT LOCATION</p>
             </div>
             <p className="head">ORDERS</p>
            </div>
      );
     orders =props.orderList.map((order)=>{
        return (
            
            <div className="field" key={order.order_id}> 
                <p className="order_id" title="VIEW ORDER LOCATION IN MAP"><NavLink to={"/map/"+order.order_id }>{order.order_id}</NavLink></p>
                <p className="receiver_name">{order.receiver_name}</p>
                <p className="receiver_phone_no">{order.receiver_phone_no}</p>
                <p className="pickup_address">{order.pickup_address}</p>
                <p className="destination_address" title="EDIT DESTINATION ADDRESS" onClick={props.handleShowModal}>{order.destination_address}</p>
                <p className="order_date">{order.order_date.split('T')[0]}</p>
                <p className="description">{order.description}</p>
                <p className="status">{order.status}</p>
                <p className="c_location">{order.c_location}</p>
                <p className={"delete "+ order.order_id} onClick={handleDeleteOrder} title="DELETE ORDER">X</p>


            </div>
           
        
        )}
        )
  }
    


    return (
        <div>
            {title}
            <div className="contain">
    
        < CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={700}
        transitionLeaveTimeout={500}
       
            >
           {orders} 
           
           </CSSTransitionGroup>

           </div>
        </div>
    );
}

export default Order;
