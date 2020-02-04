import React,{ Component } from 'react';
import submitControl from '../controls/formControl';
import toastr from '../notification/Toastr';


//STYLES
import '../styles/Form.css'

class Adminlog extends Component {

  state={
    data:{
        user:{
            email:"",
            password:""
        },
        chck:false
    }
};



handleChange=(e)=>{
  const newData = {...this.state.data};
  newData.user[e.target.id] = e.target.value;
  this.setState({
         data: newData 
  })
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    submitControl(true, this);

    console.log(this.state)
      fetch('https://s-i-api.herokuapp.com/api/v1/admin',{
              method: "POST",
              headers:{
                  "Content-Type":"application/json",
              },
              body: JSON.stringify(this.state.data.user)
    }).then(res=>{
        return res.json()
    }).then(data=>{
      submitControl(false, this);
      console.log(data)

      if (data.valid === false){
        toastr.error(data.message)
        this.props.history.push('/login');

    }   else if (data.valid === true){
        sessionStorage.setItem('adminToken', data.token);
        this.props.history.push('/admin_comp');
        toastr.success('YOU ARE LOGGED IN AS THE SUPER USER "ADMIN"')
        console.log(data);

    }   

    }).catch()




  }

componentDidMount(){


}


    render(){

    return (
      <div className="admin">
        <form className="adminlog"  onSubmit={this.handleSubmit}>
            <div>
            <p style={{color: 'yellowgreen'}}>ADMIN SECTION !!!</p>
            <label htmlFor="email">EMAIL:</label>
            <input id="email" type="text" onChange={this.handleChange} placeholder="ENTER EMAIL" required/>
            </div>
            <div>
            <label htmlFor="password" >PASSWORD:</label>
            <input id="password" type="password" onChange={this.handleChange} placeholder="ENTER PASSWORD" required/>
            </div>
            <button disabled={this.state.data.chck} type="submit">LogIn</button>
        </form>
      </div>
    );
    }
  }
  
  export default Adminlog;
  