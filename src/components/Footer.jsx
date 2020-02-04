import React from 'react';

const Footer = ()=>{

return(

    <div className="footer">
        <div className="about">
            <h3>ABOUT</h3>
            <p>SendIT is a courier service that helps users deliver parcels to different destinations</p>
            <p>SendIT provides courier quotes based on weight categories.</p>
        </div>
        <div className="contact">
            <h3>CONTACT US</h3>
            <p title="SEND US AN EMAIL" style={{color: '#f00'}}>Email Us</p>
            <p title="REACH US ON FACEBOOK" style={{color: '#f00'}}>FaceBook</p>
        </div>
        <div className="copywright">
            <h4 className="n-mark" style={{color: '#00f'}}>SEND <span style={{color: '#f00'}}>IT</span></h4>
            <p>copywright&copy; 2019!!!</p>
        </div>
       
    </div>
)



}
export default Footer;