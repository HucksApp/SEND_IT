import React, { Component } from 'react';
import toastr from '../notification/Toastr'
import submitControl from '../controls/formControl'


//STYLES
import '../styles/Form.css'

class Login extends Component {


    state = {
        data: {
            user: {
                email: "",
                password: ""
            },
            chck: false
        }
    };


   // REACTION TO ADMIN BUTTON CLICK 
    AdminSlide = () => {
        const chk = window.confirm('RESTRICTED ADMIN ONLY !!!');
        if (chk === false) {
            return
        } else {
            this.props.history.push('/adminlogin')
        }

    };

    

//STORE USER INPUT CRED IN STATE 

    handleChange = (e) => {
        const newData = { ...this.state.data };
        newData.user[e.target.id] = e.target.value;
        this.setState({
            data: newData
        })
    }





// HANDLE LOGIN FOR SUBMIT
//---DISABLE FORM AFTER FIRST ENTRY
//---REQUEST  TO API FOR NEW SESSION JWT
//---CHECK RESPONSES AND REACT

    handleSubmit = (e) => {
        e.preventDefault();
        submitControl(true, this);


        fetch('https://s-i-api.herokuapp.com/api/v1/old_user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.data.user)
        }).then((res) => {
            console.log(res);
            return res.json();
        }).then((data) => {
            submitControl(false, this);

            console.log(data)
            if (data.valid === false) {
                toastr.error(data.message)

            } else if (data.valid === true) {

                sessionStorage.setItem("token", data.token);
                toastr.success('YOU ARE LOGGED IN AS ' + this.state.data.user.email)
                this.props.history.push('/account');
            } else {
                window.alert('API ERROR');
            }
        }).catch(err => toastr.error("THERE WAS AN ERROR GETTING YOUR PROFILE"))




    }



    render() {

        return (
            <div className="login">
                <form className="user-login" onSubmit={this.handleSubmit}>
                    <div>
                        <p>Dont't Have An Account? Go To Signup<span onClick={this.AdminSlide} id="adbtn">AD</span></p>
                        <label htmlFor="email">EMAIL:</label>
                        <input id="email" type="text" placeholder="ENTER EMAIL" onChange={this.handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password" >PASSWORD:</label>
                        <input id="password" type="password" placeholder="ENTER PASSWORD" onChange={this.handleChange} required />
                    </div>
                    <button disabled={this.state.data.chck} type="submit" title="SUBMIT">LogIn</button>
                </form>
            </div>
        );
    }
}

export default Login;
