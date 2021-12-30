import React from "react";
import { useNavigate } from "react-router-dom";
// bootstrap
import { Container, Button, Card } from "react-bootstrap";
// icons 
import { MdAssignmentInd } from 'react-icons/md';
// API Calls
import UserAPI from '../api/UserAPI';

// css styling
import '../styles/landing_styles/LandingPageStyle.css'

const SignupPage = () => {
  // router
  let navigate = useNavigate()
  
  // handlers
  const handleSignup = async (event) => {
    event.preventDefault()
    let userObj = {
      'username' : event.target.username.value,
      'password' : event.target.password.value,
    }
    let response = await UserAPI.signupUser(userObj)
    let data = await response.json()
    if (data.error) {
      console.error('there was an error signing up')
    } else {
      let newUserToken = data.token
      let profileObj = {
        'user' : data.id,
        'boats' : [],
        'trips' : []
      }
      let second_response = await UserAPI.createProfile(profileObj, newUserToken)
      let second_data = await second_response.json()
      navigate('/login')
    }
  }

  // render
  return (
    <Container fluid className="background">
      <Card className="card">
        <Card.Header as="h2"><MdAssignmentInd /></Card.Header>
        <Card.Body>
          <Card.Title>Signup</Card.Title>
          <Container >
            <form onSubmit={(event) => handleSignup(event)} className="form-container">
              <label>Username:</label>
              <input type='text' placeholder="username" name='username' />
              <label>Password:</label>
              <input type='password' name='password' />
              <Button className="login-button" type="submit">Signup</Button>
            </form>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SignupPage;