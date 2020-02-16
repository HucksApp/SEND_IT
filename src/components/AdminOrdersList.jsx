import React from 'react';

const AdminOrdersList = (props) => {
   

let sn = 0
    const orders =props.orders_list.map((order)=>{
                sn++;

        return (
            <div className="list_top" key={sn}> 
                <p className="ord_lists_title1">{order.user_email}</p>
                <p className="ord_lists_field1">{order.order_id}</p>
                <p className="rord_lists_field2">{order.receiver_name}</p>
                <p className="ord_lists_field3">{order.receiver_phone_no}</p>
                <p className="ord_lists_field4">{order.pickup_address}</p>
                <p className="ord_lists_field5">{order.destination_address}</p>
                <p className="ord_lists_field6">{order.order_date.split('T')[0]}</p>
                <p className="ord_lists_field7"  title ="UPDATE THE ORDER STATUS BELOW" >{order.status}</p>
                <p className="ord_lists_field8"  title ="CHANGE THE ORDER CURRENT LOCATION BELOW">{order.c_location}</p>

            </div>
        
        )}
        )





    return (
        <div className="orders_lists">
            <h4 className="list_titl">
                KEYS
            </h4>
            <div className="top">
                <p className="ord_lists_title1">USER EMAIL</p>
                <p className="ord_lists_title2">ORDER ID</p>
                <p className="ord_lists_title3">RECEIVERS NAME</p>
                <p className="ord_lists_title4">RECEIVERS PHONE NO</p>
                <p className="ord_lists_title5">PICKUP ADDRESS</p>
                <p className="ord_lists_title6">DESTINATION ADDRESS</p>
                <p className="ord_lists_title7">ORDER DATE</p>
                <p className="ord_lists_title8">STATUS</p>
                <p className="ord_lists_title9">CURRENT LOCATION</p>
            </div>
            <h4 className="list_valu">
                ORDERS
            </h4>
            <div className="order_wrap">
            {orders}
            </div>
        </div>
    );
}

export default AdminOrdersList;
