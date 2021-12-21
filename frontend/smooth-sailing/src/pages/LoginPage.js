import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// css styling
import '../styles/landing_styles/LandingPageStyle.css'
// icons
import { MdOutlineLogin, MdLockOpen } from 'react-icons/md';

const LoginPage = ({isLoggedIn, handleLogout, handleLogin}) => {

  // first render will be if the user is already logged in
  if (isLoggedIn) {
    return (
      <Container fluid className="background">
        <Card className="card">
          <Card.Header as="h2"><MdLockOpen /></Card.Header>
          <Card.Body>
            <Card.Title>Successful Login</Card.Title>
            <Card.Text>
              No updates since you last logged in
            </Card.Text>
            <Container className="button-container">
              <Link to='/'><Button>Home</Button></Link>
              <Button onClick={handleLogout}>Logout</Button>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    )
  }
  // render if the user is not logged in
  return (
    <Container fluid className="background">
      <Card className="card">
        <Card.Header as="h2"><MdOutlineLogin /></Card.Header>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Container >
            <form onSubmit={handleLogin} className="form-container">
              <label>Username:</label>
              <input type='text' placeholder="username" name='username' />
              <label>Password:</label>
              <input type='password' name='password' />
              <Button className="login-button" type="submit">Login</Button>
            </form>
          </Container>
          <hr/>
          <Card.Text>
            If you don't have an account signup is easy! 
          </Card.Text>
          <Link to='/signup'><Button>Join the Community</Button></Link>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginPage;