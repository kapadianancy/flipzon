import React from 'react';
import {NavLink} from 'react-router-dom';
import './Footer.css';
import home from '../../../images/home.png';
import call from '../../../images/call.png';
import email from '../../../images/email.png';

 
const Footer = () => {
    const style=
    {
        main:{
         
          backgroundColor: "#007bff",
          borderTop: "1px solid #E7E7E7",
          textAlign: "center",
          padding: "10px",
          position: "static",
          left: "0",
          bottom: "0",
          width: "100%"
        },    
        phantom:{
        display: 'block',
        padding: '20px',
        //height: '60px',
        width: '100%'
        },
        links:
        {
            display:"block",
            color:"white"
        }
    }
    return (
         <div style={style.main}>
           
            <footer class="page-footer font-small blue pt-4">
          <div class="container-fluid text-center text-md-left">
            <div class="row">
              <div class="col-md-6 mt-md-0 mt-3">
                <h5 class="text-uppercase" style={{color:"#212529"}}>About Us</h5>
                <p style={{color:"white"}}>La Net Team is an India based software outsourcing company that offers high quality and cost effective software development service to its clients. We strive for on time delivery of the projects and adhere to stringent quality standards.

We offer flexible and cutting edge solutions that help our clients to operate more efficiently and gain an edge over their competitors.</p>
              </div>
              <hr class="clearfix w-100 d-md-none pb-3"/>
              <div class="col-md-3 mb-md-0 mb-3">
                <h5 class="text-uppercase" style={{color:"#212529"}}>Links</h5>
                <ul class="list-unstyled">
                    <NavLink to="/" exact style={style.links}>Home</NavLink>
                   
                   <NavLink to="/category" exact style={style.links}>Category</NavLink>
                   
                   <NavLink to="/login" exact style={style.links}>Login</NavLink>
                </ul>
              </div>
              
              <div class="col-md-3 mb-md-0 mb-3">
                <h5 class="text-uppercase" style={{color:"#212529"}}>Contact</h5>
                <p style={style.links}>
                <img src={home} height="25px" width="25px"/> 405/406 Luxuria Business Hub, Near VR mall, Surat - Dumas Rd, Surat, Gujarat 395007</p>
                <p style={style.links}>
                <img src={email} height="25px" width="25px"/> recruitment@lanetteam.com</p>
                <p style={style.links}>
                <img src={call} height="25px" width="25px"/>  +91-7229030202</p>
                
                
              </div>
             </div> 

           
          <div class="footer-copyright text-center py-3" style={{color:"#212529"}}>© 2020 Copyright:
            <a style={{color:"#212529"}} href="https://lanetteam.com/"><b>lanetteam.com</b></a>
          </div>
         </div>
</footer>
        </div>
    );
}
 

 
export default Footer;