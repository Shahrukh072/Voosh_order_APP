import React, { useState } from 'react'
import validator from 'validator'
import { Link } from "react-router-dom";



function Signup() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
 
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [validPhoneNumber, setvalidPhoneNumber] = useState(false);


  const validatePhoneNumber = (e) => {
    var phoneNumber = e.target.value;

    if (validator.isPhoneNumber(phoneNumber)) {
      setMessage("");
      setvalidPhoneNumber(true);
    } else {
      setMessage("Please, enter valid PhoneNumber!");
      setvalidPhoneNumber(false);
    }

    setPhoneNumber(e.target.value);
    setSubmitted(false);

  };
 
  // Handling the firstname change
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the firstname change
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const setting = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({firstname:firstname, lastname:lastname, phoneNumber:phoneNumber, password:password})
  
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstname === '' || lastname === '' ||phoneNumber === '' || password === '') {
      setError(true);
    }
    else if(validPhoneNumber === false){
      setError(true);
    }
    else {
      setSubmitted(true);
      setError(false);
      try{
        const response = await fetch('http://localhost:8000/user/signup', setting);
          console.log(response);
        const ans = await response.json();
        
        console.log(ans);
    }catch(error) {
      console.log("Some error");
    }
    }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {phoneNumber} successfully registered!!</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
 

  


  return (

    
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>
      
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
 
      <form>
        {/* Labels and inputs for form data */}
        <label className="label">FirstName</label>
        <input onChange={handleFirstName} className="input"
          value={firstname} type="text" />
 
        <label className="label">LastName</label>
        <input onChange={handleLastName} className="input"
          value={lastname} type="text" />

        <label className="label">Phone Number</label>
        <input onChange={(e) =>  validatePhoneNumber(e) } className="input"
          value={phoneNumber} type="PhoneNumber" />

        <span
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
                >
                  {message}
                </span>
        <label className="label">Password</label>
        <input onChange={handlePassword} className="input"
          value={password} type="password" />

 
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
        <ul>
          <li>
          <Link to='/Signin'>Signin</Link>
          </li>
      </ul>
      </form>
    </div>
  );
}

export default Signup