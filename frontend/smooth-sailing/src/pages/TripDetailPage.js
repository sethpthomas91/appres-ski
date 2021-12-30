// trip detail page will contain:
// 1. a map centered on the locaiton of the lake for the trip
// 2. A container with the current graph that looks at location and displays wind weather

// bootstrap
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// router
import { useNavigate, useParams } from "react-router-dom";
// components
import GoogleMapTripDisplay from "../components/GoogleMapTripDisplay";
import ForecastContainer from "../components/forecast/ForecastContainer";
import TripCard from "../components/TripCard";
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
  const [locationsArr, setLocationsArr] = useState(null)
  const [ boat, setBoat ] = useState(null)
  const [ forecast, setForecast ] = useState(null)
  // this state will depend on the trip date to determine whether to show current vs hourly weather. Default will be current weather
  const [ isHourly, setIsHourly ] = useState(false)

  // router
  const navigate = useNavigate()
  
  
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
        setLocationsArr([data])
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
        setForecast(data)
      }
    }
    if (location) {
      getForecast()
    }
  }, [ location ])

  // helper functions
  const deleteTrip = async (tripID) => {
    const userToken = localStorage['auth-user']
    const data = await SailAPI.deleteTrip(tripID, userToken)
    console.log(tripID)
    navigate('/')
  }

  // render
  return (
    <Container fluid className="background">
      <Container>
        <Button onClick={() => deleteTrip(trip.id)}>Delete Trip</Button>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate(`/trips/${tripID}/edit/`)}>Edit</Button>
      </Container>
      <Container fluid xs>
      {trip && location && <TripCard trip={trip} location={location}/>}
      </Container>
      <Row>
        <ForecastContainer location={location} trip={trip} boat={boat} forecast={forecast} isHourly={isHourly} />
        <Col xs>
            {locationsArr && <GoogleMapTripDisplay locationsArr={locationsArr} />}
        </Col>
      </Row>
    </Container>
  )
}

export default TripDetailPage