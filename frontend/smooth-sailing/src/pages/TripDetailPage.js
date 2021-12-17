// trip detail page will contain:
// 1. a map centered on the locaiton of the lake for the trip
// 2. A container with the current graph that looks at location and displays wind weather

// bootstrap
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// router
import { useParams } from "react-router-dom";
// components
import GoogleMapTripDisplay from "../components/GoogleMapTripDisplay";
import ForecastContainer from "../components/forecast/ForecastContainer";
// API Call
import SailAPI from '../api/SailAPI';
import WeatherAPI from '../api/WeatherAPI';
// helper
import DateTimeHelpers from '../helper/DateTimeHelpers';


const TripDetailPage = () => {
  // params
  const params = useParams()
  const { tripID } = params
  // states
  const [ trip, setTrip ] = useState(null)
  const [ location, setLocation ] = useState(null)
  const [ boat, setBoat ] = useState(null)
  const [ forecast, setForecast ] = useState(null)
  // this state will depend on the trip date to determine whether to show current vs hourly weather. Default will be current weather
  const [ isHourly, setIsHourly ] = useState(false)

  
  
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
      // placed this call in here so getting the forecast has access to the state isHourly
      getHourlyStatus()
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

  const getHourlyStatus = () => {
    if (trip) {
      const userDate = new Date();
      const insideHourly = DateTimeHelpers.determineDateWithinHoulryRange(userDate, trip.trip_date)
      setIsHourly(insideHourly)
    }
  }

  // Will only execute after we have the location so we can grab the forecast
  useEffect(() => {
    const getForecast = async () => {
      const lat = location.latitude
      const long = location.longitude

      // isHourly is set as soon as we have a trip and the location is called
      const data = await WeatherAPI.fetchNoaaAPICall(lat, long, isHourly)
      if (data) {
        console.log("forecast:", data)
        setForecast(data)
      }
    }
    if (location) {
      getForecast()
    }
  }, [ location ])

  // render
  return (
    <Container fluid>
      <h1>Trip detail page</h1>
      <Container>
        <h1>This will be the forecast on top of the page</h1>
      </Container>
          <Row>
            <Col xs>
              <h3>Forecast</h3>
              <ForecastContainer location={location} trip={trip} boat={boat} forecast={forecast} isHourly={isHourly} />
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