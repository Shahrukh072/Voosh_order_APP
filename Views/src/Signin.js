import React, { useState, } from 'react'
function Signin() {
    const [ phoneNumber,setPhoneNumber]=useState(""); 
	const [password,setPassword]=useState(""); 
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
   
	// const[dataInput, setDataInput]=useState(""); 

    const setting = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ phoneNumber: phoneNumber, password:password})
      
      };

	const handleSubmit=async (e)=>{
		e.preventDefault();
    if ( phoneNumber === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      try{
        const response = await fetch('http://localhost:8000/user/signin', setting);
          console.log(response);
        const ans = await response.json();
        
        console.log(ans);
    }catch(error) {
      console.log("Some error");
    }
    }
	}

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


    const successMessage = () => {
        return (
          <div
            className="success"
            style={{
              display: submitted ? '' : 'none',
            }}>
            <h1>User { phoneNumber} Logged in successfully!!</h1>
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

	return(
	<div>

      <div>
        <h1>User Login Page</h1>
      </div>
      
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

		<form action="" onSubmit={handleSubmit}> 
        <label className="label">PhoneNumber</label>
        <input onChange={handlePhoneNumber} className="input"
          value={phoneNumber} type="phoneNumber" />
 
        <label className="label">Password</label>
        <input onChange={handlePassword} className="input"
          value={password} type="password" />

			<button onClick={handleSubmit} className="btn" type="submit">
          Login
        </button>
		</form>
	</div>
)
}

export default Signin