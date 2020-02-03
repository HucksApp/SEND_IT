import React from 'react';
import logo from '../img/sendlogo.gif';


import Blog from './Blog';

const Home = ()=>{

return(

    <div className="home">
        <img src={logo} alt="SEND IT LOGO"/>
       <Blog/>
        <h3>WE DELIVER YOUR PACKAGES LIKE THE RECEIVER LIVES NEXT DOOR</h3>
        <p>We Deliver All Your Packages In Different Sizes to Any Location</p>
        <p>Where Would You Like To Send Us ?</p>
    </div>
)



}
export default Home;