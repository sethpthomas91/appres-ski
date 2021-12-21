// React
import React, { useContext, useEffect, useState } from "react";
import UserContext from '../contexts/UserContext';
// bootstrap
import { Container, Row, Col } from 'react-bootstrap'
// components
import TripListComp from "../components/TripListComp";
import BoatListComp from "../components/BoatListComp";
import GoogleMapTripDisplay from "../components/GoogleMapTripDisplay";
import LoginSignupComp from "../components/landing/LoginSignupComp";
import NavbarComp from "../components/NavbarComp";
// API Calls
import SailAPI from '../api/SailAPI';
// css styling
import '../styles/landing_styles/LandingPageStyle.css'


const LandingPage = ({ isLoggedIn, handleLogout }) => {
  // context
  const userContext = useContext(UserContext);
  const { user } = userContext

  // state
  const [locationsArr, setLocationsArr] = useState()

  useEffect(() => {
    const getLocationsArr = async () => {
      const userToken = localStorage['auth-user'] 
      const data = await SailAPI.fetchLocations(userToken)
      if (data) {
        setLocationsArr(data)
        console.log(data)
      }
    }
    getLocationsArr() 
  }, [])

  // render
  return (
    <Container fluid className="background">
        {user &&
          <Container className="no-padding-no-margin" fluid>
            <NavbarComp username={user.username} handleLogout={handleLogout}/>
            <Row>
              <Col  xs>
                <TripListComp />
              </Col>
              <Col xs>
                {locationsArr && <GoogleMapTripDisplay locationsArr={locationsArr} />}
              </Col>
              <Col xs>
                <BoatListComp />
              </Col>
            </Row>
          </Container>
        }
        {/* displays the logout button, need to find a better place, in a navbar? */}
        {
          !isLoggedIn
            ?
            <LoginSignupComp />
            :
            <></>
        }
    </Container>
  )
}

export default LandingPage;