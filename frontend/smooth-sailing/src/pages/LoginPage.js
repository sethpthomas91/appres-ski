import React from "react";
import { Link } from "react-router-dom";

const LoginPage = ({isLoggedIn, handleLogout, handleLogin}) => {
  // first render will be if the user is already logged in
  if (isLoggedIn) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <div>
          <Link to='/'>Home</Link>
        </div>
      </div>
    )
  }
  // render if the user is not logged in
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type='text' placeholder="MCplowfaCE" name='username'/>
        <label>Password:</label>
        <input type='password' name='password'/>
        <button type="submit">Login</button>
      </form>
      <hr/>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/signup'>Join the Community</Link>
      </div>
    </div>
  )
}

export default LoginPage;