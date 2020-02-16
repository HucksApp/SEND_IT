import React, { Component } from 'react';
import toastr from '../notification/Toastr'
import Modal from 'react-modal';


//COMPONENTS
import Order from './Order';
import EditDestination from './EditDestination';
import CreateOrder from './CreateOrder';

export class Orders extends Component {


    // INITIAL STATE AND BIND EVENT 

    constructor(props) {
        super(props);

        this.state = {
            data: {
                orderList: [],
                showEdit: "close",
                showCreate: "close",
                showModal: false
            }
        };

        //BIND EVENTS 

        this.handleDeleteUpdate = this.handleDeleteUpdate.bind(this);
        this.handleClickCreate = this.handleClickCreate.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleDestinationUpdate = this.handleDestinationUpdate.bind(this);
        this.handleUpdateOrder = this.handleUpdateOrder.bind(this);



    }




    //SEND REQUEST WITH TOKEN TO API WITH USER JWT 
    //GET USER ORDERS AND STORE IN STATE TO BE REF BY TEMPLATE

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            toastr.warning("YOU ARE NOT LOGGED IN");
            this.props.history.push('/login');

        } else if (token) {

            fetch('https://s-i-api.herokuapp.com/api/v1/order', {

                headers: {
                    Authorization: token
                }

            }).then(res => { return res.json() })
                .then(data => {
                    if (data.length === 0) {

                        toastr.info('YOUR ORDERS LISTS IS STILL EMPTY')

                    } else {

                        const newData = { ...this.state.data };
                        newData.orderList = data;
                        this.setState({
                            data: newData
                        });


                    }

                }).catch(err => toastr.error('THERE WAS AN ERROR GETTING THE PROFILE ORDERS'))


        }


    };


    //RECEIVES NEW ORDER LIST WITHOUT THE DELETED ORDER AND
    // THE DELETED ORDER ID
    //SET THE STATE ORDERS LIST TO THE RECIEVED LIST TO REFLECT DELETE
    //SEND AN API CALL WITH RECEIVED ORDER ID TO BE DELETED

    handleDeleteUpdate = (list, del) => {

        const deldataCopy = { ...this.state.data };
        deldataCopy.orderList = list;

        this.setState({
            data: deldataCopy
        });
        const token = sessionStorage.getItem('token');

        fetch('https://s-i-api.herokuapp.com/api/v1/delete_order/' + del, {
            method: "DELETE",
            headers: {
                Authorization: token
            }
        }).then(res => {
            toastr.info('YOU HAVE DELETED ORDER ' + del)
        }).catch(err => toastr.error('THERE WAS AN ERROR DELETING ORDER ' + del))

    }




    // RECEIVES AN OBJECT WITH PROPERTY VALUE OF THE NEW ADDRESS
    //AND THE ORDER WHOSE ADDRESS IS TO BE UPDATED
    //SET STATE WITH NEW ADDRESS TO REFLECT CHANGES
    // SEND API CALL WITH OBJECT RECEIVED TO BE UPDATED IN DATABASE


    handleDestinationUpdate = ({ upDestnAddress, ordId }) => {
        const copyData = { ...this.state.data };
        const newList = copyData.orderList.map(order => {
            if (order.order_id === parseInt(ordId)) {
                order.destination_address = upDestnAddress;
                return order
            } else {
                return order;
            }
        });

        copyData.orderList = newList;
        this.setState({
            data: copyData
        })
        const token = sessionStorage.getItem('token');

        fetch('https://s-i-api.herokuapp.com/api/v1/update_destination', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({ upDestnAddress, ordId })
        })
            .then(res => {
                toastr.info('YOU JUST UPDATED DESTINATION ADDRESS OF ORDER  ' + ordId)

            }).catch(err => toastr.error('THERE WAS AN ERROR UPDATING ORDER ' + ordId))



    }


    //TOG THE ORDER EDIT MODAL

    handleShowModal = () => {
        const copyState = { ...this.state };
        switch (this.state.data.showModal) {
            case false:
                copyState.data.showModal = true;
                this.setState({ data: copyState.data })
                break;
            case true:
                copyState.data.showModal = false;
                this.setState({ data: copyState.data })
                break;
            default:


        }
    }





    // CREATE A NEW ORDER
    //---CREATE DATE VARIABLE, ORDER ID TO BE OUTPUTED AT THE DOM
    //---CREATE ORDER OBJECT TO BE SENT TO API
    //---UPDATE THE STATE TO REFLECT THE ADDED ORDER
    //---SEND API CALL WITH ORDER OBJECT PAYLOAD

    handleUpdateOrder = (data) => {
        let date = Date.now();
        let dateObj = new Date(date);
        let day = dateObj.getDate();
        let month = dateObj.getMonth();
        let year = dateObj.getFullYear();
        let dateString = year + "-" + month + "-" + day + "Taaaa ";
        let id
        if (this.state.data.orderList.length !== 0) {
            id = this.state.data.orderList[this.state.data.orderList.length - 1].order_id + 1;
        } else {
            id = 1
        }


        const dataCopy = { ...this.state.data };
        data.date = dateString;
        const newOrder = {
            order_id: id,
            receiver_name: data.receiverName,
            receiver_phone_no: data.receiverPhoneNumber,
            pickup_address: data.pickupAddress,
            destination_address: data.destinationAddress,
            order_date: data.date,
            description: data.description,
            c_location: 'Newly Processed',
            status: 'InTransit',

        };

        const newList = [...dataCopy.orderList]
        newList.push(newOrder)
        dataCopy.orderList = newList;

        this.setState({
            data: dataCopy
        })
        const token = sessionStorage.getItem('token');

        data.date = date;
        fetch('https://s-i-api.herokuapp.com/api/v1/new_order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                toastr.success("NEW ORDER ADDED TO ORDER LIST")
            }).catch(err => toastr.error('THERE WAS AN ERROR CREATING A NEW ORDER '))


    }






    // TOG THE CREATE ORDER FORM
    //---SET A VARIABLE ON THE STATE THAT REF A CLASS DISPLAYS THE FORM
    handleClickCreate = () => {

        const newData = { ...this.state.data };
        if (newData.showCreate === "close") {
            newData.showCreate = "open";
            this.setState({
                data: newData
            });
        } else if (newData.showCreate === "open") {
            newData.showCreate = "close";
            this.setState({
                data: newData
            });
        }

    }








    render() {
        return (
            <div className="orders">
                <h3 className="orders-title">LIST OF ORDERS AND DELIVERY DETAILS</h3>
                <Order orderList={this.state.data.orderList}
                    handleDeleteUpdate={this.handleDeleteUpdate}
                    handleShowModal={this.handleShowModal} />
                <button onClick={this.handleClickCreate}>CREATE ORDER</button>
                <Modal
                    isOpen={this.state.data.showModal}
                    className="ordermodal"
                    contentLabel="ord_contentlabel"
                    onRequestClose={this.handleShowModal}
                    overlayClassName="Overlay2"

                >
                    <EditDestination
                        handleDestinationUpdate={this.handleDestinationUpdate}
                        handleShowModal={this.handleShowModal} />
                </Modal>
                <CreateOrder show={this.state.data.showCreate} updateOrder={this.handleUpdateOrder} />


            </div>
        )
    }
}

export default Orders;
