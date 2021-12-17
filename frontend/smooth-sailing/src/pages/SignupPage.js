import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from '../api/UserAPI';

const SignupPage = (props) => {
  // router props
  let navigate = useNavigate()
  
  // handlers
  const handleSignup = async (event) => {
    event.preventDefault()
    let userObj = {
      'username' : event.target.username.value,
      'password' : event.target.password.value,
    }
    console.log("sent user obj:",userObj)
    let response = await UserAPI.signupUser(userObj)
    console.log("response:",response)
    let data = await response.json()
    console.log("DATA:",data)
    if (data.error) {
      console.error('there was an error signing up')
    } else {
      navigate('/login')
    }
  }

  // render
  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={(event) => handleSignup(event)}>
        <label>Username:</label>
        <input type='text' placeholder="snowCrash" name='username'></input>
        <label>Password:</label>
        <input type='password'name='password'></input>
        <button type="submit">Signup</button>
      </form>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  )
}

export default SignupPage;