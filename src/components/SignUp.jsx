import React, { Component } from 'react';
import submitControl from '../controls/formControl'
import toastr from '../notification/Toastr'


//STYLES
//import '../styles/Form.css'

class Signup extends Component {

    state = {
        data: {
            user: {
                username: "",
                phoneNumber: "",
                houseAddress: "",
                email: "",
                password: ""
            },
            chck: false
        }
    };

//STORE INPUT IN STATE

    updateState = (e) => {
        const newData = { ...this.state.data };
        let infoField;

        switch (e.target.id) {
            case 'username':
                infoField = 'username';
                break;
            case 'phoneno':
                infoField = 'phoneNumber';
                break;
            case 'house_address':
                infoField = 'houseAddress';
                break;
            case 'email':
                infoField = 'email';
                break;
            case 'password':
                infoField = 'password';
                break;
            default:
                return

        }



        newData.user[infoField] = e.target.value;
        this.setState({
            data: newData
        });
    }


//HANDLE FORM SUBMIT
//---DISABLE FORM AFTER FIRST ENTRY
//---SEND AN API CALL TO REQUEST FOR NEW SESSION JWT


    formAction = (e) => {
        e.preventDefault();

        submitControl(true, this)
        fetch('https://s-i-api.herokuapp.com/api/v1/new_user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.data.user)
        })

            .then(res => { return res.json() })
            .then(data => {
                submitControl(false, this);
                switch (data.valid) {
                    case false:
                        toastr.warning(data.message);
                        this.props.history.push('/login');
                        break;
                    case true:
                        toastr.success("ACCOUNT CREATED SUCCESSFULLY");
                        toastr.success("YOU ARE LOGGED IN AS " + this.state.data.user.email);
                        sessionStorage.setItem('token', data.token);
                        this.props.history.push('/account');
                        break;
                    default:
                        toastr.info('NOT A VALID INFO')
                };
            }).catch(err => {
                toastr.error('THERE WAS AN ERROR CREATING NEW USER ' + this.state.data.user.username)
                console.log(err)
            })


    }


    render() {

        return (
            <div className="signup">
                <form className="user-login" onSubmit={this.formAction}>
                    <div>
                        <p>Have An Account? Go To Login</p>
                        <label htmlFor="username">USERNAME<sup style={{color:'#f00'}}>*</sup>: </label>
                        <input id="username" type="text" placeholder="ENTER USER NAME" onChange={this.updateState} minLength="3" maxLength="20" required />
                    </div>
                    <div>
                        <label htmlFor="phoneno" >PHONE NO<sup style={{color:'#f00'}}>*</sup>: </label>
                        <input id="phoneno" type="number" placeholder="ENTER PHONE NO IN FORMAT 2349012345678" pattern="[2-4]{3}[0-9]{10}" onChange={this.updateState} minLength="13" maxLength="13" required />
                    </div>
                    <div>
                        <label htmlFor="house_address" >HOUSE ADDRESS<sup style={{color:'#f00'}}>*</sup>:</label>
                        <input id="house_address" type="text" placeholder="ENTER HOUSE ADDRESS " onChange={this.updateState} />
                    </div>
                    <div>
                        <label htmlFor="email">EMAIL<sup style={{color:'#f00'}}>*</sup>:</label>
                        <input id="email" type="email" placeholder="ENTER EMAIL" onChange={this.updateState} required />
                    </div>
                    <div>
                        <label htmlFor="password" >PASSWORD<sup style={{color:'#f00'}}>*</sup>:</label>
                        <input id="password" placeholder="ENTER PASSWORD" type="password" onChange={this.updateState} minLength="8" maxLength="20" required />
                    </div>
                    <button disabled={this.state.data.chck} type="submit" title="CREATE ACCOUNT">Create</button>
                </form>
            </div>
        );
    }
}

export default Signup;
