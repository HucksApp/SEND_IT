import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import '../styles/Nav.css';
import toastr from '../notification/Toastr'


//SEND REQUEST TO END SESSION TO API
// CLEAR BROWSER STORAGE
//REDIRECT TO HOME PAGE
//ALTER NAV COMPONENT BASED ON USER TYPE

const Nav = (props) => {


    const handlelogout = (e) => {
        e.preventDefault();

        fetch('https://s-i-api.herokuapp.com/api/v1/logout').then((res) => {
            return res.json();
        }).then(res => console.log(res)).catch(err => toastr.error('THERE WAS AN WITH CANCELING YOUR SESSION'))

        sessionStorage.clear();
        props.history.push('/home');
        toastr.success("YOU JUST LOGGED OUT")


    }





    const chkLogin = sessionStorage.getItem('token');
    const chkAdminLogin = sessionStorage.getItem('adminToken');
    if (!chkLogin && !chkAdminLogin) {

        return (
            <div className="nav_link">
                <h1 style={{ color: '#00f' }}>SEND<span style={{ color: '#f00' }}> IT</span></h1>
                <ul>
                    <li><NavLink to="/home" title="HOME PAGE">Home</NavLink></li>
                    <li><NavLink to="/login" title="LOGIN PAGE">Login</NavLink></li>
                    <li><NavLink to="/signup" title="SIGNUP PAGE">Signup</NavLink></li>
                </ul>
            </div>


        )
    } else if (chkLogin && !chkAdminLogin) {

        return (
            <div className="nav_link">
                <h1 style={{ color: '#00f' }}>SEND<span style={{ color: '#f00' }}> IT</span></h1>
                <ul>
                    <li><NavLink to="/home" title="HOME PAGE">Home</NavLink></li>
                    <li><NavLink to="/account" title="ACCOUNT PAGE">Account</NavLink></li>
                    <li><NavLink to="/orders" title="ORDERS AND ORDERS INFO PAGE">Orders</NavLink></li>
                    <li><NavLink to="/logout" title="LOGOUT" onClick={handlelogout}>Logout</NavLink></li>
                </ul>
            </div>


        )

    } else if (!chkLogin && chkAdminLogin) {
        return (

            <div className="nav_link">
                <h1 style={{ color: '#00f' }}>SEND<span style={{ color: '#f00' }}> IT</span></h1>
                <ul>
                    <li><NavLink to="/logout" title="LOGOUT" onClick={handlelogout}>Logout</NavLink></li>
                </ul>
            </div>
        )
    }


}

export default withRouter(Nav);