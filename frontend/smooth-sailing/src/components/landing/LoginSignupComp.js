// bootstrap
import { Card, Button, Container  } from "react-bootstrap";
// router
import { Link } from 'react-router-dom';
// css
import '../../styles/landing_styles/LoginCompStyle.css'
// icons
import { MdLockOutline } from 'react-icons/md';

const LoginSignupComp = () => {
  // render
  return (
    <Card className="login-box">
      <Card.Header as="h2"><MdLockOutline /></Card.Header>
      <Card.Body>
        <Card.Title>Welcome to Smooth Sailing</Card.Title>
        <Card.Text>
          Please login or create and account to join our community. 
          </Card.Text>
        <Container className="button-container">
          <Link to='/login'><Button variant="primary">Login</Button></Link>
          <Link to='/signup'><Button variant="primary">Signup</Button></Link>
        </Container>
      </Card.Body>
    </Card>
  )
}

export default LoginSignupComp;