import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
//import cylinder from './Images/gas-tank.png'
import cylinder from './images/gas-tank.png'
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      pincode: '',
      email: '',

      address: '',
      phone_number: '',
      comapny:'',
      tohome:false

    }
    this.changefirstname = this.changefirstname.bind(this)
    this.changelastname = this.changelastname.bind(this)
    this.changeusername = this.changeusername.bind(this)
    this.changepassword = this.changepassword.bind(this)
    this.changepincode = this.changepincode.bind(this)
    this.changeemail = this.changeemail.bind(this)
    this.changeaddress = this.changeaddress.bind(this)
    this.changephonenumber = this.changephonenumber.bind(this)
    this.changeacomapny=this.changeacomapny.bind(this)

    this.onSubmit = this.onSubmit.bind(this)


  }
changefirstname(event) {
    this.setState({
      firstname: event.target.value
    })
  }
  changelastname(event){
  this.setState({
    lastname: event.target.value
  })


}
changeusername(event) {
  this.setState({
    username: event.target.value
  })
}
changepassword(event) {
  this.setState({
    password: event.target.value
  })
}
changepincode(event) {
  this.setState({
    pincode: event.target.value
  })
}
changeemail(event) {
  this.setState({
    email: event.target.value
  })
}
changeaddress(event) {
  this.setState({
    address: event.target.value
  })
}
changephonenumber(event) {
  this.setState({
    phone_number: event.target.value
  })
}
changeacomapny(event){
  this.setState({
    comapny:event.target.value
  })
}
onSubmit(event) {
  
  event.preventDefault()
  const registered = {
    firstname: this.state.firstname,
    lastname: this.state.lastname,
    username: this.state.username,
    password: this.state.password,
    pincode: this.state.pincode,
    email: this.state.email,
    address: this.state.address,
    phone_number: this.state.phone_number,
    comapny:this.state.comapny
  }
  axios.post('http://localhost:4000/api/register', registered)

    .then(response => console.log(response.data))

  this.setState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    pincode: '',
    email: '',
    address: '',
    phone_number: '',
    comapny:'',
    tohome:true
  
  })
 
}
render(){
  return (
    <div className="container">
    {  this.state.tohome?<Navigate to="/home" />: 
    <div><section className="h-100 bg-dark">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img src={cylinder}
                    alt="Sample photo" className="img-fluid"
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Registration form</h3>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="text" id="form3Example1m" onChange={this.changefirstname} className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example1m"><strong style={{ "color": "red" }}>*</strong>First name</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="text" id="form3Example1n" onChange={this.changelastname} className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example1n"><strong style={{ "color": "red" }}>*</strong>Last name</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="text" id="form3Example1m1" onChange={this.changeusername} className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example1m1"><strong style={{ "color": "red" }}>*</strong>UserName</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="password" id="form3Example1n1" onChange={this.changepassword} className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example1n1"><strong style={{ "color": "red" }}>*</strong>Password</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" id="form3Example8" onChange={this.changeacomapny} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example8"><strong style={{ "color": "red" }}>*</strong>Company</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="text" id="form3Example8" onChange={this.changeaddress} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example8"><strong style={{ "color": "red" }}>*</strong>Address</label>
                    </div>








                    <div className="form-outline mb-4">
                      <input type="text" id="form3Example90" onChange={this.changepincode} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example90"><strong style={{ "color": "red" }}>*</strong>Pincode</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="number" id="form3Example99" onChange={this.changephonenumber} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example99">Phone Number</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="text" id="form3Example97" onChange={this.changeemail} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3Example97"><strong style={{ "color": "red" }}>*</strong>Email ID</label>
                    </div>

                    <div className="d-flex justify-content-end pt-3">

                      <Link to="/home"> <button type="button" className="btn btn-warning btn-lg ms-2" onClick={this.onSubmit}>Submit form</button></Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section></div>
}
    </div>
  
  )
}
}

export default Register
  ;
