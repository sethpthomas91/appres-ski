// bootstrap
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// router
import { useParams } from "react-router-dom";
// components
import GoogleMapTripDisplay from "../components/GoogleMapTripDisplay";
// API Call
import SailAPI from '../api/SailAPI';

const TripDetailPage = () => {
  // params
  const params = useParams()
  const { tripID } = params
  const [ trip, setTrip ] = useState(null)
  const [ location, setLocation ] = useState(null)
  const [ boat, setBoat ] = useState(null)

  
  
  // effects
  useEffect(() => {
    const getTrip = async () => {
      const userToken = localStorage['auth-user']
      const data = await SailAPI.fetchTripById(userToken, tripID)
      if (data) {
        setTrip(data)
      }
    }
    
    getTrip()
  }, []) // initial render

  // This only executes if we have a valid trip  so we can grab the location
  useEffect(() => {
    const getLocation = async () => {
      const LocationID = trip.location
      const userToken = localStorage['auth-user'] 
      const data = await SailAPI.fetchLocationById(userToken, LocationID)
      if (data) {
        setLocation(data)
      }
    }
    if (trip) {
      getLocation()
    }
  }, [ trip ])

  // Will only execute after we have the trip so we can grab the boat information
  useEffect(() => {
    const getBoat = async () => {
      const boatID = trip.boat
      const userToken = localStorage['auth-user'] 
      const data = await SailAPI.fetchBoatById(userToken, boatID)
      if (data) {
        setBoat(data)
      }
    }
    if (trip) {
      getBoat()
    }
  }, [ trip ])
  

  return (
    <Container fluid>
      <h1>Trip detail page</h1>
      <Container>
        <h1>This will be the forecast on top of the page</h1>
      </Container>
          <Row>
            <Col xs>
              <h3>Forecast</h3>
              <Container>
                <h5> Trip Name: {trip && trip.trip_name} </h5>
                <h5> Date: {trip && trip.trip_date}  </h5>
                <h5> Description: {trip && trip.description}  </h5>
                <hr/>
                <h5> Location: {location && location.location_name}  </h5>
                <h5> Location: {location && `Long: ${location.longitude}, Lat: ${location.latitude}`}  </h5>
                <hr/>
                <h5> Boat: {boat && boat.boat_name}  </h5>
                <h5> Max Wind: {boat && boat.max_wind}  </h5>
                <h5> Min Wind: {boat && boat.min_wind}  </h5>
              </Container>
            </Col>
            <Col xs>
              <h3>My Trip Location</h3>
            <GoogleMapTripDisplay />
            </Col>
          </Row>
        </Container>
  )

}

export default TripDetailPage