import React, { Component } from 'react';
import toastr from '../notification/Toastr'
import Modal from 'react-modal';



//STYLES
import '../styles/Account.css'


//COMPONENT
import AccEdit from './AccEdit';
import OrderSummary from './OrderSumary';

class Account extends Component {



    // SET INITIAL STATE AND BIND EVENT

    constructor(props) {

        super(props);


        this.state = {
            data: {
                user: {
                    email: "",
                    phone_number: "",
                    username: "",
                    user_password: "",
                    address: "",
                    order_counts: ""
                },
                showModal: false,
                show: "not-active",
                typ: "",
                typDisplay: "",
                passHide: "",
            }
        };

        // BIND EVENTS

        this.updateState = this.updateState.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }

    // OPEN MODAL
    handleOpenModal() {
        let newState = { ...this.state.data };
        newState.showModal = true;
        this.setState({
            data: newState
        });
    }

    //  CLOSE MODAL
    handleCloseModal() {
        let newState = { ...this.state.data };
        newState.showModal = false;
        this.setState({
            data: newState
        });
    }



    //UPDATE THE STATE TO REFLECT ACCOUNT CHANGES
    updateState = (data) => {
        const nwdata = { ...this.state.data };
        const { val, keyToValue } = data;
        let keyToValueFormat;

        switch (keyToValue) {

            case 'username':
                keyToValueFormat = 'user-name';
                break;
            case 'phone_number':
                keyToValueFormat = 'phone-number';
                break;
            case 'password':
                keyToValueFormat = 'password';
                break;
            case 'address':
                keyToValueFormat = 'house-address'
                break;
            default:
                return;
        }
        nwdata.user[keyToValue] = val;

        this.setState({
            data: nwdata
        });

        const payload = {
            newVal: val,
            keyToValue: keyToValueFormat
        };

        const token = sessionStorage.getItem('token');
        this.handleCloseModal();

        fetch('https://s-i-api.herokuapp.com/api/v1/update_profile', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(payload)
        }).then(res => {
            toastr.success(`YOU JUST UPDATED YOUR ${keyToValue} `);
        }).catch(err => toastr.error('THERE WAS AN ERROR UPDATING YOUR ' + keyToValue))
    };


    //FETCH PROFILE AND STORE IN STATE
    componentDidMount() {
        Modal.setAppElement('body')

        const token = sessionStorage.getItem('token');
        if (!token) {
            toastr.warning("YOU ARE NOT LOGGED IN")
            this.props.history.push('/login')

        } else if (token) {

            fetch('https://s-i-api.herokuapp.com/api/v1/account', {
                method: "GET",
                headers: {
                    Authorization: token
                }
            }).then(res => {
                return res.json()
            }).then(data => {

                let passHide = "";


                const newState = { ...this.state.data };
                newState.user = data[0];

                for (let i in data[0].user_password) {
                    passHide = passHide + " * ";
                };
                newState.passHide = passHide;
                this.setState({
                    data: newState
                })

            }).catch(err => toastr.error('THERE WAS AN ERROR FETCHING PROFILE'))

        }

    };



    // EDIT BUTTON REACTION 
    // ------CHECKS THE FIELD TYPE TO KNOW REACTION
    //UPDATE A VARIABLE ON STATE THAT INDICATE THE FIELD BEING EDITED

    handleEdit = (e) => {

        if (e.target.classList.contains('password')) {
            const auth = window.prompt('PLEASE ENTER OLD PASSWORD');
            if (auth !== this.state.data.user.user_password && auth !== null) {
                toastr.warning('IN CORRECT PASSWORD')
                return
            } else if (auth !== this.state.data.user.user_password && auth === null) {
                return
            }

            else {
                toastr.info('ENTER THE NEW PASSWORD');
            }
        } else {

        }

        const newState = { ...this.state };
        const typ = e.target.classList.value.split(' ')[1];
        let typCopy = "";
        let typdisplay = "";

        console.log(typ)
        switch (typ) {

            case 'user-name':
                typdisplay = 'User Name';
                break;
            case 'phone-number':
                typdisplay = 'Phone Number';
                break;
            case 'password':
                typdisplay = 'Password';
                break;
            case 'house-address':
                typdisplay = 'Address'
                break;
            default:
                return;
        }



        switch (typ) {

            case 'user-name':
                typCopy = 'username';
                break;
            case 'phone-number':
                typCopy = 'phone_number';
                break;
            case 'password':
                typCopy = 'password';
                break;
            case 'house-address':
                typCopy = 'address'
                break;
            default:
                return;
        }

        newState.data.typDisplay = typdisplay;
        newState.data.typ = typCopy;


        switch (this.state.data.showModal) {

            case false:
                newState.data.showModal = true;

                this.setState({
                    state: newState
                });
                break;
            case true:
                newState.data.showModal = false;
                this.setState({
                    state: newState
                });
                break;
            default:
                return;
        };



    }



    render() {
        Modal.setAppElement('body');

        return (
            <div className="account">
                <div className="user-container">
                    <div className="compartment">
                        <h4 className="title">USERNAME</h4>
                        <p className="f-value">{this.state.data.user.username}<button title="EDIT USERNAME" className="edit user-name" onClick={this.handleEdit}>I</button></p>
                    </div>
                    <div className="compartment">
                        <h4 className="title">HOUSE ADDRESS</h4>
                        <p className="f-value">{this.state.data.user.address}<button title="EDIT HOUSE ADDRESS" className="edit house-address" onClick={this.handleEdit}>I</button></p>
                    </div>
                    <div className="compartment">
                        <h4 className="title">PHONE NUMBER</h4>
                        <p className="f-value">{this.state.data.user.phone_number}<button title="EDIT PHONE NUMBER" className="edit phone-number" onClick={this.handleEdit}>I</button></p>
                    </div>
                    <div className="compartment">
                        <h4 className="title">PASSWORD</h4>
                        <p className="f-value">{this.state.data.passHide}<button title="EDIT PASSWORD" className="edit password" onClick={this.handleEdit}>I</button></p>
                    </div>
                    <div className="compartment">
                        <h4 className="title">EMAIL</h4>
                        <p className="f-value">{this.state.data.user.email}</p>
                    </div>
                    <div className="compartment">
                        <h4 className="title">PROFILE ORDER SUM</h4>
                        <p className="f-value">{this.state.data.user.order_counts}</p>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.data.showModal}
                    contentLabel="example"
                    onRequestClose={this.handleCloseModal}
                    className="modal"
                    overlayClassName="Overlay"
                >
                    <AccEdit typ={this.state.data.typ}
                        typdisplay={this.state.data.typDisplay}
                        updateState={this.updateState}
                        handleCloseModal={this.handleCloseModal}

                    />
                </Modal>

                <OrderSummary orders={this.state.data} />
            </div>
        );
    }
}

export default Account;
