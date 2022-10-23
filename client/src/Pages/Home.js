import React from 'react'
import cylinder from './images/gas.png'
import user from './images/user.png'
import gastank from './images/gas-tank.png'
import { Link } from 'react-router-dom'
export default function Home() {
 

  return (
    <div className="home">
      <nav className="navbar navbar-light bg-light border-dark">
        <div className="container-fluid" >
          <a className="navbar-brand" height="40px" href="#">
            <div style={{ "display": "inline-flex" }}>
              <div style={{ "padding": 10, "backgroundColor": "black", "borderRadius": 100 }}><img src={cylinder} alt="" width="40" height="40" class="rounded-circle mx-20" /></div>
              <h1 style={{ "margin": "0 10px", "fontFamily": "'Inconsolata', monospace" }}>Gas Booking System</h1>
            </div>
          </a>
          <div><Link to="/register"><button className='btn btn-success' >Register</button></Link></div>
        </div>
      </nav>
      <div className="container1">
        <div><Link to="/Login"><a  style={{"text-decoration":"none"}}><img src={user} alt="..." width="100" height="100" className="img-thumbnail" />
         <h3>user Login</h3></a></Link> 
        </div>
        <div ><a  style={{"text-decoration":"none"}}><img src={gastank} alt="..." width="100" height="80" className="img-thumbnail" />
          <h3>admin Login</h3></a>
        </div>
      </div>
    </div>
  )
}
