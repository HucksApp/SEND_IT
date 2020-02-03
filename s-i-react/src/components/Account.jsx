import React,{ Component } from 'react';
import toastr from '../notification/Toastr'

//STYLES
import '../styles/Account.css'


//COMPONENT
import AccEdit from './AccEdit';
import OrderSummary from './OrderSumary';

class Account extends Component {

state = {
        data:{
            user:{
                email: "",
                phone_number: "",
                username: "",
                user_password: "",
                address: "",
                order_counts: ""
            },
            show:"not-active",
            typ:""
        }
};


updateState=(data)=>{
console.log(data)
const nwdata = {...this.state.data};
const { val, keyToValue}= data;
let field;

switch(keyToValue){

case 'user-name':
    field='username';
    break;
case 'phone-number':
    field='phone_number';
    break;
case 'password':
    field='user_password';
    break;
case 'house-address':
    field= 'address'
    break;
default:
     break;

}
nwdata.user[field] = val;

this.setState({
            data: nwdata
});

const payload = {
            newVal: val,
            keyToValue
};

const token =sessionStorage.getItem('token');

fetch('https://s-i-api.herokuapp.com/api/v1/update_profile',{
    method:"PUT",
    headers:{
        "Content-Type":"application/json",
        Authorization: token
    },
    body: JSON.stringify(payload)
}).then(res=>{
    toastr.success(`YOU JUST UPDATED YOUR ${keyToValue} `);
    toastr.info('CLOSE THE EDIT TAB \n WITH THE EDIT BUTTON IN RED')
}).catch(err=>toastr.error('THERE WAS AN ERROR UPDATING YOUR '+ keyToValue))





};



componentDidMount(){

const token = sessionStorage.getItem('token'); 
if(!token){
    toastr.warning("YOU ARE NOT LOGGED IN")
    this.props.history.push('/login')

}else if(token){

    fetch('https://s-i-api.herokuapp.com/api/v1/account',{
        method:"GET",
        headers:{
            Authorization : token
        }
}).then(res=>{return res.json()
}).then(data=>{
    console.log(data)
    console.log(this.state)
const newState = {...this.state.data};
newState.user = data[0];
this.setState({
        data: newState
})

}).catch(err=>toastr.error('THERE WAS AN ERROR FETCHING PROFILE'))

}

};


handleEdit=(e)=>{
    console.log(e.target.type)
const newState= {...this.state};
 const typ = e.target.classList.value.split(' ')[1];
 newState.data.typ = typ;

switch(this.state.data.show){

    case 'not-active':
        newState.data.show= "active";
     e.target.setAttribute('style','background-color: red')

        this.setState({
            state: newState
        });
    break;
    case 'active':
        newState.data.show= "not-active";
        e.target.setAttribute('style','background-color: blue')
        this.setState({
            state: newState
        });
    break;
    default:
        newState.data.show= "not-active";
        this.setState({
            state: newState
        });   
};
console.log(typ)

    
}



    render(){
    
    return (
      <div className="account">
          <div className="user-container">
                <div className="compartment">
                    <h4 className="title">USERNAME</h4>
                    <p className="f-value">{this.state.data.user.username}<button title="EDIT USERNAME"className="edit user-name" onClick={this.handleEdit}>I</button></p>
                </div>
                <div className="compartment">
                    <h4 className="title">HOUSE ADDRESS</h4>
                    <p className="f-value">{this.state.data.user.address}<button  title="EDIT HOUSE ADDRESS"className="edit house-address" onClick={this.handleEdit}>I</button></p>
                </div>
                <div className="compartment">
                    <h4 className="title">PHONE NUMBER</h4>
                    <p className="f-value">{this.state.data.user.phone_number}<button title="EDIT PHONE NUMBER" className="edit phone-number" onClick={this.handleEdit}>I</button></p>
                </div>
                <div className="compartment">
                    <h4 className="title">PASSWORD</h4>
                    <p className="f-value">{this.state.data.user.user_password}<button title="EDIT PASSWORD" className="edit password" onClick={this.handleEdit}>I</button></p>
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
        <AccEdit  show={this.state.data.show}  typ={this.state.data.typ}  updateState={this.updateState}/>
        <OrderSummary  orders={this.state.data} />
      </div>
    );
    }
  }
  
  export default Account;
  