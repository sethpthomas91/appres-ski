import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
// bootstrap
import { Container, Row, Col } from 'react-bootstrap'
// components
import TripListComp from "../components/TripListComp";
import BoatListComp from "../components/BoatListComp";
import GoogleMapTripDisplay from "../components/GoogleMapTripDisplay";


const LandingPage = ({ isLoggedIn, handleLogout }) => {
  // context
  const userContext = useContext(UserContext);
  const { user } = userContext

  // render
  return (
    <div>
      <h1>Landing Page</h1>
      { user &&
        <Container fluid>
          Welcome {user.username}
          <Row>
            <Col xs>
              <h3>My Trips</h3>
              <TripListComp />
            </Col>
            <Col xs>
            <h3>My Trip Map</h3>
            <GoogleMapTripDisplay />
            </Col>
            <Col xs>
            <h3>My Boats</h3>
              <BoatListComp />
            </Col>
          </Row>
        </Container>
      }
      {/* displays the logout button, need to find a better place, in a navbar? */}
      {
        !isLoggedIn
        ?
          <div>
            <div>
              <Link to='/login'> Login </Link>
            </div>
            <div>
              <Link to='/signup'> Signup </Link>
            </div>
          </div>
          :
          <button onClick={handleLogout}> Logout </button>
      }

    </div>
  )
}

export default LandingPage;